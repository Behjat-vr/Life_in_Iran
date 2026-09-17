// =============================================
// 🎭 StoryEngine — Narrative Controller
// =============================================

import { eventBus, EVENTS } from './EventBus.js';
import { gameState } from './GameState.js';
import { STORY_DATA } from '../data/stories.js';

class StoryEngine {
  constructor() {
    this._storyData = STORY_DATA;
    this._currentEvent = null;
    this._setupListeners();
  }

  _setupListeners() {
    // Start life when family is confirmed
    eventBus.on(EVENTS.FAMILY_CONFIRMED, () => {
      console.log('🎭 StoryEngine: FAMILY_CONFIRMED received, starting life...');
      this._startLife();
    });

    // Reload current event after comeback
    eventBus.on(EVENTS.STORY_COMEBACK, (data) => {
      const storyId = data.state.currentStoryId;
      if (storyId) {
        this._currentEvent = this._findEvent(storyId);
        eventBus.emit(EVENTS.STORY_NEW_EVENT, this._currentEvent);
      }
    });
  }

  _startLife() {
    gameState.applyFamilyBonuses();
    gameState.ageUp(0);

    const firstEventId = this._getFirstEventId();
    console.log('🎭 Starting with event:', firstEventId);
    this.goToEvent(firstEventId);
  }

  _getFirstEventId() {
    // Always start with birth_generic (we have one standard birth event)
    if (this._findEvent('birth_generic')) return 'birth_generic';
    // Fallback: first event in birth array
    const births = this._storyData.birth;
    if (births && births.length > 0) return births[0].id;
    return null;
  }

  goToEvent(eventId) {
    if (!eventId) return;

    const event = this._findEvent(eventId);
    if (!event) {
      console.error('Story event not found:', eventId);
      const fallback = this._getFallbackEvent(gameState.currentAge);
      if (fallback) {
        this._currentEvent = fallback;
        gameState.advanceStory(fallback.id);
        eventBus.emit(EVENTS.STORY_NEW_EVENT, fallback);
      }
      return;
    }

    this._currentEvent = event;

    // Advance age if event specifies one
    if (event.age !== undefined && event.age !== null && event.age > gameState.currentAge) {
      gameState.ageUp(event.age);
    }

    gameState.advanceStory(eventId);
    eventBus.emit(EVENTS.STORY_NEW_EVENT, event);
  }

  makeChoice(choiceIndex) {
    if (!this._currentEvent || !this._currentEvent.choices) {
      console.error('No current event or choices');
      return false;
    }

    const choice = this._currentEvent.choices[choiceIndex];
    if (!choice) {
      console.error('Choice index out of range:', choiceIndex);
      return false;
    }

    // For __DEATH__ ending choices, cost 0
    const cost = choice.tokenCost || 0;
    if (cost > 0 && !gameState.spendTokens(cost)) {
      eventBus.emit(EVENTS.MODAL_OPEN, { type: 'shop' });
      return false;
    }

    // Apply stat changes
    if (choice.effects && Object.keys(choice.effects).length > 0) {
      gameState.applyStatChanges(choice.effects);
    }

    // Modify death age if specified
    if (choice.deathAgeMod) {
      gameState.modifyDeathAge(choice.deathAgeMod);
    }

    // Sudden death check
    if (choice.deathChance && gameState.checkSuddenDeath(choice.deathChance)) {
      gameState.triggerDeath(choice.deathCause || 'یک اتفاق ناگوار');
      return true;
    }

    // Record the choice
    gameState.advanceStory(this._currentEvent.id, choiceIndex);

    // Emit choice made event
    eventBus.emit(EVENTS.STORY_CHOICE_MADE, {
      event: this._currentEvent,
      choice,
      choiceIndex
    });

    // Handle __DEATH__ special next
    if (choice.nextId === '__DEATH__') {
      gameState.triggerDeath(this._currentEvent.title || 'پایان زندگی');
      return true;
    }

    // Navigate to next event
    const nextId = choice.nextId || this._getNextAutoEvent();

    if (nextId && !gameState.isDead) {
      setTimeout(() => {
        this.goToEvent(nextId);
      }, 400);
    }

    return true;
  }

  getCurrentEvent() {
    return this._currentEvent;
  }

  // === Internal ===

  _findEvent(eventId) {
    for (const phase of Object.values(this._storyData)) {
      if (Array.isArray(phase)) {
        const found = phase.find(e => e.id === eventId);
        if (found) return found;
      }
    }
    return null;
  }

  _getFallbackEvent(age) {
    if (age <= 3)  return this._findEvent('infant_01');
    if (age <= 6)  return this._findEvent('childhood_01');
    if (age <= 12) return this._findEvent('school_01');
    if (age <= 17) return this._findEvent('school_05');
    if (age <= 25) return this._findEvent('career_01');
    if (age <= 40) return this._findEvent('midlife_01');
    if (age <= 60) return this._findEvent('elderly_01');
    return this._findEvent('ending_peaceful');
  }

  _getNextAutoEvent() {
    const age = gameState.currentAge;
    const visitedIds = new Set(gameState.storyHistory.map(h => h.storyId));

    // Find nearest unvisited event by age
    let bestEvent = null;
    let bestAgeDiff = Infinity;

    for (const phase of Object.values(this._storyData)) {
      if (Array.isArray(phase)) {
        for (const event of phase) {
          if (!visitedIds.has(event.id) && event.age !== undefined && event.age !== null) {
            if (event.age >= age) {
              const diff = event.age - age;
              if (diff < bestAgeDiff) {
                bestAgeDiff = diff;
                bestEvent = event;
              }
            }
          }
        }
      }
    }

    if (bestEvent) return bestEvent.id;

    // No more events — end of life
    if (age >= gameState.deathAge) {
      gameState.triggerDeath('عمرت به پایان رسید');
      return null;
    }

    return this._findEvent('ending_peaceful')?.id || null;
  }

  processNarrative(text) {
    if (!text) return '';
    return text
      .replace(/\{playerName\}/g, gameState.playerName || 'تو')
      .replace(/\{fatherName\}/g, gameState.father?.name || 'پدرت')
      .replace(/\{motherName\}/g, gameState.mother?.name || 'مادرت')
      .replace(/\{cityName\}/g, gameState.city?.name || 'شهرت')
      .replace(/\{age\}/g, gameState.currentAge.toString())
      .replace(/\{fatherJob\}/g, gameState.father?.job || '')
      .replace(/\{motherJob\}/g, gameState.mother?.job || '');
  }
}

export const storyEngine = new StoryEngine();
export default StoryEngine;
