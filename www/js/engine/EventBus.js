// =============================================
// 📡 EventBus — Pub/Sub System
// =============================================

class EventBus {
  constructor() {
    this._listeners = new Map();
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {Function} callback - Handler function
   * @returns {Function} Unsubscribe function
   */
  on(event, callback) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, []);
    }
    this._listeners.get(event).push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this._listeners.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) callbacks.splice(index, 1);
      }
    };
  }

  /**
   * Subscribe to an event once
   * @param {string} event - Event name
   * @param {Function} callback - Handler function
   */
  once(event, callback) {
    const unsub = this.on(event, (...args) => {
      unsub();
      callback(...args);
    });
  }

  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  emit(event, data) {
    const callbacks = this._listeners.get(event);
    if (callbacks) {
      callbacks.forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`EventBus error in "${event}":`, err);
        }
      });
    }
  }

  /**
   * Remove all listeners for an event, or all events
   * @param {string} [event] - Optional event name
   */
  off(event) {
    if (event) {
      this._listeners.delete(event);
    } else {
      this._listeners.clear();
    }
  }
}

// Event Constants
export const EVENTS = {
  // Navigation
  SCREEN_CHANGE: 'screen:change',
  
  // Game State
  GAME_START: 'game:start',
  GAME_RESET: 'game:reset',
  
  // Family Selection
  FATHER_SELECTED: 'family:father',
  MOTHER_SELECTED: 'family:mother',
  CITY_SELECTED: 'family:city',
  FAMILY_CONFIRMED: 'family:confirmed',
  
  // Story
  STORY_NEW_EVENT: 'story:newEvent',
  STORY_CHOICE_MADE: 'story:choiceMade',
  STORY_AGE_UP: 'story:ageUp',
  STORY_COMEBACK: 'story:comeback',
  
  // Tokens
  TOKENS_CHANGED: 'tokens:changed',
  TOKENS_SPENT: 'tokens:spent',
  TOKENS_ADDED: 'tokens:added',
  TOKENS_INSUFFICIENT: 'tokens:insufficient',
  
  // Stats
  STATS_CHANGED: 'stats:changed',
  
  // Death
  PLAYER_DIED: 'player:died',
  
  // UI
  TOAST_SHOW: 'ui:toast',
  MODAL_OPEN: 'ui:modalOpen',
  MODAL_CLOSE: 'ui:modalClose',
  TYPEWRITER_DONE: 'ui:typewriterDone',
};

// Singleton instance
export const eventBus = new EventBus();
export default EventBus;
