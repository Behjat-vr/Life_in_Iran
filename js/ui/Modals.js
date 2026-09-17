// =============================================
// 🪟 Modals — Shop & Settings
// =============================================

import { eventBus, EVENTS } from '../engine/EventBus.js';
import { gameState } from '../engine/GameState.js';
import { tokenSystem } from '../engine/TokenSystem.js';

class Modals {
  constructor() {
    this._overlay = null;
    this._modal = null;
    // Don't touch DOM here — wait for init()
    this._setupListeners();
  }

  init() {
    if (this._overlay) return;
    this._overlay = document.createElement('div');
    this._overlay.className = 'modal-overlay';
    this._overlay.id = 'modal-overlay';
    this._overlay.innerHTML = `<div class="modal" id="modal-content"></div>`;

    this._overlay.addEventListener('click', (e) => {
      if (e.target === this._overlay) this.close();
    });

    document.body.appendChild(this._overlay);
    this._modal = this._overlay.querySelector('#modal-content');
  }

  _ensureInit() {
    if (!this._overlay) this.init();
  }

  _setupListeners() {
    eventBus.on(EVENTS.MODAL_OPEN, (data) => {
      if (data.type === 'shop') this.openShop();
    });
    eventBus.on(EVENTS.MODAL_CLOSE, () => this.close());
  }

  openShop() {
    this._ensureInit();
    const items = tokenSystem.getShopItems();

    let html = `
      <div style="position: relative;">
        <button class="modal__close" id="modal-close-btn">✕</button>
        <h2 class="modal__title">🏪 فروشگاه توکن</h2>
        <div style="text-align: center; margin-bottom: var(--space-4);">
          <div class="token-display" style="font-size: var(--fs-lg); padding: var(--space-3) var(--space-6);">
            <span class="token-display__icon">🪙</span>
            <span>موجودی: <strong id="shop-token-count">${gameState.tokens}</strong> توکن</span>
          </div>
        </div>
        <div class="shop__grid">
    `;

    items.forEach(item => {
      html += `
        <div class="shop-item" data-shop-id="${item.id}">
          <div class="shop-item__icon">${item.icon}</div>
          <div class="shop-item__name">${item.name}</div>
          <div class="shop-item__tokens">${item.tokens.toLocaleString('fa-IR')} 🪙</div>
          <div class="shop-item__price">${item.price}</div>
          <button class="btn btn-primary btn-sm shop-buy-btn" data-item-id="${item.id}">خرید</button>
        </div>
      `;
    });

    html += `</div></div>`;
    this._modal.innerHTML = html;
    this._overlay.classList.add('active');

    document.getElementById('modal-close-btn')?.addEventListener('click', () => this.close());

    this._modal.querySelectorAll('.shop-buy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        tokenSystem.purchaseItem(itemId);
        const countEl = document.getElementById('shop-token-count');
        if (countEl) countEl.textContent = gameState.tokens;
        eventBus.emit(EVENTS.TOKENS_CHANGED, { tokens: gameState.tokens });
      });
    });

    const escHandler = (e) => {
      if (e.key === 'Escape') { this.close(); document.removeEventListener('keydown', escHandler); }
    };
    document.addEventListener('keydown', escHandler);
  }

  close() {
    this._ensureInit();
    this._overlay.classList.remove('active');
  }
}

export const modals = new Modals();
export default Modals;
