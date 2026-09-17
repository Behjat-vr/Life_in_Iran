// =============================================
// 📝 TypeWriter — Text Animation Effect
// =============================================

import { eventBus, EVENTS } from '../engine/EventBus.js';

class TypeWriter {
  constructor() {
    this._isTyping = false;
    this._currentTimeout = null;
    this._queue = [];
    this._speed = 30; // ms per character
    this._resolve = null;
  }

  /**
   * Type text into an element character by character
   * @param {HTMLElement} element - Target element
   * @param {string} text - Text to type
   * @param {Object} options - Options
   * @returns {Promise} Resolves when typing is complete
   */
  type(element, text, options = {}) {
    return new Promise((resolve) => {
      this._resolve = resolve;
      this.stop();

      const speed = options.speed || this._speed;
      const showCursor = options.cursor !== false;
      
      element.innerHTML = '';
      this._isTyping = true;

      if (showCursor) {
        element.classList.add('typing');
      }

      let i = 0;
      const chars = [...text]; // Handle multi-byte chars (Persian)

      const typeNext = () => {
        if (i < chars.length && this._isTyping) {
          // Handle HTML tags
          if (chars[i] === '<') {
            let tag = '';
            while (i < chars.length && chars[i] !== '>') {
              tag += chars[i];
              i++;
            }
            if (i < chars.length) {
              tag += chars[i]; // closing >
              i++;
            }
            element.innerHTML += tag;
            typeNext(); // Continue immediately for tags
            return;
          }

          element.innerHTML += chars[i];
          i++;

          // Vary speed for natural feel
          let delay = speed;
          const lastChar = chars[i - 1];
          if (lastChar === '.' || lastChar === '!' || lastChar === '؟') {
            delay = speed * 8; // Pause at sentence end
          } else if (lastChar === '،' || lastChar === ',' || lastChar === '؛') {
            delay = speed * 4; // Pause at comma
          } else if (lastChar === '\n') {
            delay = speed * 6; // Pause at newline
          }

          this._currentTimeout = setTimeout(typeNext, delay);
        } else {
          // Done typing
          this._isTyping = false;
          element.classList.remove('typing');
          
          if (showCursor) {
            // Remove cursor after a beat
            setTimeout(() => {
              element.classList.remove('typing');
            }, 500);
          }

          eventBus.emit(EVENTS.TYPEWRITER_DONE);
          resolve();
        }
      };

      typeNext();
    });
  }

  /**
   * Skip to end of current typing
   * @param {HTMLElement} element - Target element
   * @param {string} fullText - The full text to show
   */
  skip(element, fullText) {
    this.stop();
    if (element && fullText) {
      element.innerHTML = fullText;
      element.classList.remove('typing');
    }
    if (this._resolve) {
      this._resolve();
      this._resolve = null;
    }
    eventBus.emit(EVENTS.TYPEWRITER_DONE);
  }

  /**
   * Stop typing
   */
  stop() {
    this._isTyping = false;
    if (this._currentTimeout) {
      clearTimeout(this._currentTimeout);
      this._currentTimeout = null;
    }
  }

  get isTyping() {
    return this._isTyping;
  }
}

export const typeWriter = new TypeWriter();
export default TypeWriter;
