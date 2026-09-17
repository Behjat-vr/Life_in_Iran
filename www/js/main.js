// =============================================
// 🎮 Main — Application Entry Point
// =============================================

import { eventBus, EVENTS } from './engine/EventBus.js';
import { gameState } from './engine/GameState.js';
import { storyEngine } from './engine/StoryEngine.js';
import { tokenSystem } from './engine/TokenSystem.js';
import { screenManager } from './ui/ScreenManager.js';
import { notifications } from './ui/Notifications.js';
import { modals } from './ui/Modals.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎮 زندگی در ایران — شروع');

  // 1. Init DOM-dependent UI modules
  notifications.init();
  modals.init();

  // 2. Handle __DEATH__ ending choice
  eventBus.on(EVENTS.STORY_CHOICE_MADE, (data) => {
    if (data.choice?.nextId === '__DEATH__' && !gameState.isDead) {
      gameState.triggerDeath(data.event?.title || 'پایان زندگی');
    }
  });

  // 3. Init screen manager (sets up screens + shows welcome)
  screenManager.init();

  // Debug logs
  eventBus.on(EVENTS.SCREEN_CHANGE,    (d) => console.log('📺 Screen:', d.screen));
  eventBus.on(EVENTS.STORY_AGE_UP,     (d) => console.log(`🎂 Age: ${d.oldAge} → ${d.newAge}`));
  eventBus.on(EVENTS.PLAYER_DIED,      (d) => console.log(`💀 Died at age ${d.age}: ${d.cause}`));
  eventBus.on(EVENTS.STORY_NEW_EVENT,  (d) => console.log(`📖 Event: ${d.id} (age ${d.age})`));
  eventBus.on(EVENTS.FAMILY_CONFIRMED, (d) => console.log('👨‍👩‍👧 Family confirmed, deathAge:', d.deathAge));
});
