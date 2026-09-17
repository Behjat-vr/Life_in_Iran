// =============================================
// 💰 TokenSystem — Economy Manager
// =============================================

import { eventBus, EVENTS } from './EventBus.js';
import { gameState } from './GameState.js';

class TokenSystem {
  constructor() {
    this.INITIAL_TOKENS = 200;
    this.COMEBACK_COST = 50;
    this._listenersSetup = false;
    
    this.SHOP_ITEMS = [
      {
        id: 'bronze',
        name: 'بسته برنزی',
        icon: '🥉',
        tokens: 100,
        price: '۱۰,۰۰۰ تومان',
        priceValue: 10000
      },
      {
        id: 'silver',
        name: 'بسته نقره‌ای',
        icon: '🥈',
        tokens: 300,
        price: '۲۵,۰۰۰ تومان',
        priceValue: 25000
      },
      {
        id: 'gold',
        name: 'بسته طلایی',
        icon: '🥇',
        tokens: 1000,
        price: '۷۰,۰۰۰ تومان',
        priceValue: 70000
      },
      {
        id: 'diamond',
        name: 'بسته الماسی',
        icon: '💎',
        tokens: 5000,
        price: '۲۵۰,۰۰۰ تومان',
        priceValue: 250000
      }
    ];

    this._setupListeners();
  }

  _setupListeners() {
    eventBus.on(EVENTS.TOKENS_INSUFFICIENT, (data) => {
      eventBus.emit(EVENTS.TOAST_SHOW, {
        type: 'warning',
        message: `توکن کافی نداری! ${data.required} توکن لازمه، ${data.available} توکن داری.`
      });
    });
  }

  /**
   * Get cost for a choice
   * @param {boolean} isGood - Whether this is a "good" choice
   * @returns {number} Token cost
   */
  getChoiceCost(isGood) {
    if (isGood) {
      return Math.floor(Math.random() * 6) + 5; // 5-10
    } else {
      return Math.floor(Math.random() * 4) + 1; // 1-4
    }
  }

  /**
   * Attempt to purchase a shop item (simulated)
   * @param {string} itemId - Shop item ID
   * @returns {boolean} Success
   */
  purchaseItem(itemId) {
    const item = this.SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return false;

    // Simulated purchase — just add the tokens
    gameState.addTokens(item.tokens);
    
    eventBus.emit(EVENTS.TOAST_SHOW, {
      type: 'success',
      message: `${item.tokens} توکن به حسابت اضافه شد! 🎉`
    });

    return true;
  }

  /**
   * Attempt comeback
   * @returns {boolean} Success
   */
  attemptComeback() {
    return gameState.comeback();
  }

  getShopItems() {
    return [...this.SHOP_ITEMS];
  }
}

export const tokenSystem = new TokenSystem();
export default TokenSystem;
