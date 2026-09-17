// =============================================
// 🎮 GameState — Central State Management
// =============================================

import { eventBus, EVENTS } from './EventBus.js';

const DEFAULT_STATE = {
  // Player Info
  playerName: '',
  
  // Family
  father: null,
  mother: null,
  city: null,
  
  // Age & Life
  currentAge: 0,
  deathAge: null,         // Calculated after family selection
  isDead: false,
  causeOfDeath: '',
  
  // Stats (0-100)
  stats: {
    health: 50,
    happiness: 50,
    intelligence: 50,
    wealth: 50,
    social: 50,
    fame: 0
  },
  
  // Tokens
  tokens: 200,
  totalTokensSpent: 0,
  totalTokensPurchased: 0,
  
  // Story Progress
  currentStoryId: null,
  storyHistory: [],       // Array of {storyId, choiceIndex, age}
  decisionsCount: 0,
  
  // Comeback
  comebackStack: [],      // Stack of previous states for undo
  
  // Meta
  playCount: 0,           // How many times the player has played
  startedAt: null,
  endedAt: null,
};

class GameState {
  constructor() {
    this._state = this._deepClone(DEFAULT_STATE);
    this._loadMeta();
  }

  // === Getters ===
  
  get state() {
    return this._state;
  }

  get playerName() { return this._state.playerName; }
  get currentAge() { return this._state.currentAge; }
  get tokens() { return this._state.tokens; }
  get stats() { return { ...this._state.stats }; }
  get isDead() { return this._state.isDead; }
  get father() { return this._state.father; }
  get mother() { return this._state.mother; }
  get city() { return this._state.city; }
  get currentStoryId() { return this._state.currentStoryId; }
  get storyHistory() { return [...this._state.storyHistory]; }
  get decisionsCount() { return this._state.decisionsCount; }
  get deathAge() { return this._state.deathAge; }
  get playCount() { return this._state.playCount; }

  // === Setters ===

  setPlayerName(name) {
    this._state.playerName = name;
    this._save();
  }

  setFamily(father, mother, city) {
    this._state.father = father;
    this._state.mother = mother;
    this._state.city = city;
    
    // Calculate death age: base 50-85 + modifiers from family
    let baseDeathAge = Math.floor(Math.random() * 36) + 50; // 50-85
    
    // Family modifiers
    if (father) baseDeathAge += (father.healthMod || 0);
    if (mother) baseDeathAge += (mother.healthMod || 0);
    
    this._state.deathAge = Math.min(baseDeathAge, 95);
    this._state.startedAt = Date.now();
    
    eventBus.emit(EVENTS.FAMILY_CONFIRMED, {
      father, mother, city, deathAge: this._state.deathAge
    });
    
    this._save();
  }

  // === Stats ===

  applyStatChanges(changes) {
    const oldStats = { ...this._state.stats };
    
    Object.entries(changes).forEach(([stat, delta]) => {
      if (this._state.stats.hasOwnProperty(stat)) {
        this._state.stats[stat] = Math.max(0, Math.min(100, this._state.stats[stat] + delta));
      }
    });

    eventBus.emit(EVENTS.STATS_CHANGED, {
      oldStats,
      newStats: { ...this._state.stats },
      changes
    });

    // Check if health reached 0
    if (this._state.stats.health <= 0) {
      this.triggerDeath('سلامتت به صفر رسید');
    }

    this._save();
  }

  applyFamilyBonuses() {
    const father = this._state.father;
    const mother = this._state.mother;
    const city = this._state.city;

    if (father && father.statBonuses) {
      this.applyStatChanges(father.statBonuses);
    }
    if (mother && mother.statBonuses) {
      this.applyStatChanges(mother.statBonuses);
    }
    if (city && city.statBonuses) {
      this.applyStatChanges(city.statBonuses);
    }
  }

  // === Tokens ===

  spendTokens(amount) {
    if (this._state.tokens < amount) {
      eventBus.emit(EVENTS.TOKENS_INSUFFICIENT, { 
        required: amount, 
        available: this._state.tokens 
      });
      return false;
    }

    this._state.tokens -= amount;
    this._state.totalTokensSpent += amount;

    eventBus.emit(EVENTS.TOKENS_CHANGED, { tokens: this._state.tokens });
    eventBus.emit(EVENTS.TOKENS_SPENT, { amount, remaining: this._state.tokens });
    
    this._save();
    return true;
  }

  addTokens(amount) {
    this._state.tokens += amount;
    this._state.totalTokensPurchased += amount;

    eventBus.emit(EVENTS.TOKENS_CHANGED, { tokens: this._state.tokens });
    eventBus.emit(EVENTS.TOKENS_ADDED, { amount, total: this._state.tokens });
    
    this._save();
  }

  // === Story Progress ===

  advanceStory(storyId, choiceIndex = null) {
    // Save to comeback stack before advancing
    this._state.comebackStack.push(this._deepClone(this._state));
    // Keep only last 5 states for memory
    if (this._state.comebackStack.length > 5) {
      this._state.comebackStack.shift();
    }

    this._state.currentStoryId = storyId;
    if (choiceIndex !== null) {
      this._state.storyHistory.push({
        storyId,
        choiceIndex,
        age: this._state.currentAge,
        timestamp: Date.now()
      });
      this._state.decisionsCount++;
    }
    
    this._save();
  }

  ageUp(newAge) {
    const oldAge = this._state.currentAge;
    this._state.currentAge = newAge;
    
    eventBus.emit(EVENTS.STORY_AGE_UP, { oldAge, newAge });

    // Check if reached death age
    if (newAge >= this._state.deathAge) {
      this.triggerDeath('عمرت به پایان رسید — پیری');
    }

    this._save();
  }

  // === Comeback (Undo) ===

  canComeback() {
    return this._state.comebackStack.length > 0 && this._state.tokens >= 50;
  }

  comeback() {
    if (this._state.comebackStack.length === 0) {
      eventBus.emit(EVENTS.TOAST_SHOW, { 
        type: 'error', 
        message: 'امکان بازگشت وجود ندارد!' 
      });
      return false;
    }

    if (!this.spendTokens(50)) {
      return false;
    }

    const previousState = this._state.comebackStack.pop();
    // Preserve tokens (already deducted) and comeback stack
    const currentTokens = this._state.tokens;
    const currentTotalSpent = this._state.totalTokensSpent;
    
    this._state = previousState;
    this._state.tokens = currentTokens;
    this._state.totalTokensSpent = currentTotalSpent;
    this._state.comebackStack = previousState.comebackStack || [];

    eventBus.emit(EVENTS.STORY_COMEBACK, { state: this._state });
    eventBus.emit(EVENTS.STATS_CHANGED, { newStats: { ...this._state.stats } });
    
    this._save();
    return true;
  }

  // === Death ===

  triggerDeath(cause) {
    this._state.isDead = true;
    this._state.causeOfDeath = cause;
    this._state.endedAt = Date.now();
    
    eventBus.emit(EVENTS.PLAYER_DIED, {
      age: this._state.currentAge,
      cause,
      stats: { ...this._state.stats },
      decisionsCount: this._state.decisionsCount,
      totalTokensSpent: this._state.totalTokensSpent
    });
    
    this._save();
  }

  // === Sudden Death Check ===

  checkSuddenDeath(probability) {
    // probability is 0-1
    if (Math.random() < probability) {
      return true;
    }
    return false;
  }

  // === Death Age Modifier ===

  modifyDeathAge(modifier) {
    this._state.deathAge = Math.max(
      this._state.currentAge + 1,
      Math.min(95, this._state.deathAge + modifier)
    );
    this._save();
  }

  // === Reset ===

  reset() {
    const playCount = this._state.playCount + 1;
    this._state = this._deepClone(DEFAULT_STATE);
    this._state.playCount = playCount;
    
    eventBus.emit(EVENTS.GAME_RESET);
    this._save();
    this._saveMeta();
  }

  // === Persistence ===

  _save() {
    try {
      const saveData = { ...this._state };
      // Don't persist comeback stack (too large)
      saveData.comebackStack = [];
      localStorage.setItem('lifeInIran_save', JSON.stringify(saveData));
    } catch (e) {
      console.warn('Failed to save game state:', e);
    }
  }

  load() {
    try {
      const data = localStorage.getItem('lifeInIran_save');
      if (data) {
        const parsed = JSON.parse(data);
        this._state = { ...this._deepClone(DEFAULT_STATE), ...parsed };
        this._state.comebackStack = []; // Reset comeback on load
        return true;
      }
    } catch (e) {
      console.warn('Failed to load game state:', e);
    }
    return false;
  }

  _saveMeta() {
    try {
      localStorage.setItem('lifeInIran_meta', JSON.stringify({
        playCount: this._state.playCount
      }));
    } catch (e) { /* ignore */ }
  }

  _loadMeta() {
    try {
      const meta = localStorage.getItem('lifeInIran_meta');
      if (meta) {
        const parsed = JSON.parse(meta);
        this._state.playCount = parsed.playCount || 0;
      }
    } catch (e) { /* ignore */ }
  }

  clearSave() {
    localStorage.removeItem('lifeInIran_save');
  }

  // === Helpers ===

  _deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  getLifeSummary() {
    return {
      name: this._state.playerName,
      fatherName: this._state.father?.name || 'نامشخص',
      motherName: this._state.mother?.name || 'نامشخص',
      cityName: this._state.city?.name || 'نامشخص',
      age: this._state.currentAge,
      causeOfDeath: this._state.causeOfDeath,
      stats: { ...this._state.stats },
      decisionsCount: this._state.decisionsCount,
      totalTokensSpent: this._state.totalTokensSpent,
      playCount: this._state.playCount,
    };
  }
}

// Singleton
export const gameState = new GameState();
export default GameState;
