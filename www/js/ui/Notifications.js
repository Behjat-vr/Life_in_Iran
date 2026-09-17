// =============================================
// 🔔 Notifications — Toast System
// =============================================

import { eventBus, EVENTS } from '../engine/EventBus.js';

class Notifications {
  constructor() {
    this._container = null;
    // Don't touch DOM here — wait for init()
    this._setupListeners();
  }

  init() {
    if (this._container) return;
    this._container = document.createElement('div');
    this._container.className = 'toast-container';
    this._container.id = 'toast-container';
    document.body.appendChild(this._container);
  }

  _setupListeners() {
    eventBus.on(EVENTS.TOAST_SHOW, (data) => {
      this.show(data.message, data.type || 'info', data.duration);
    });
  }

  show(message, type = 'info', duration = 3000) {
    // Lazy init if called before explicit init()
    if (!this._container) this.init();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
    toast.innerHTML = `
      <span class="toast__icon">${icons[type] || 'ℹ️'}</span>
      <span class="toast__message">${message}</span>
    `;

    this._container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => { toast.parentNode?.removeChild(toast); }, 300);
    }, duration);
  }
}

export const notifications = new Notifications();
export default Notifications;
