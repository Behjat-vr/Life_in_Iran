// =============================================
// 📺 ScreenManager — Screen Navigation
// =============================================

import { eventBus, EVENTS } from '../engine/EventBus.js';
import { gameState } from '../engine/GameState.js';
import { storyEngine } from '../engine/StoryEngine.js';
import { tokenSystem } from '../engine/TokenSystem.js';
import { typeWriter } from './TypeWriter.js';
import { FAMILIES } from '../data/families.js';

class ScreenManager {
  constructor() {
    this._currentScreen = null;
    this._screens = {};
    this._selectedFather = null;
    this._selectedMother = null;
    this._selectedCity = null;
    this._alamZarStep = 0; // 0=father, 1=mother, 2=city
    this._currentNarrativeText = '';
  }

  init() {
    // Cache all screen elements
    document.querySelectorAll('.screen').forEach(el => {
      this._screens[el.id] = el;
    });

    // Setup screen-specific event handlers
    this._setupWelcomeScreen();
    this._setupRegisterScreen();
    this._setupGameplayScreen();

    // Show welcome screen
    this.showScreen('screen-welcome');

    // Create particles
    this._createParticles();
    this._createStars();
  }

  showScreen(screenId) {
    // Exit current screen
    if (this._currentScreen) {
      const current = this._screens[this._currentScreen];
      if (current) {
        current.classList.add('exiting');
        setTimeout(() => {
          current.classList.remove('active', 'exiting');
        }, 300);
      }
    }

    // Enter new screen
    setTimeout(() => {
      const next = this._screens[screenId];
      if (next) {
        next.classList.add('active');
        this._currentScreen = screenId;
        eventBus.emit(EVENTS.SCREEN_CHANGE, { screen: screenId });
      }
    }, this._currentScreen ? 350 : 0);
  }

  // === Welcome Screen ===

  _setupWelcomeScreen() {
    const startBtn = document.getElementById('btn-start-game');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        // Check for saved game
        if (gameState.load() && !gameState.isDead && gameState.currentStoryId) {
          // Resume saved game
          this._resumeGame();
        } else {
          gameState.clearSave();
          this.showScreen('screen-register');
        }
      });
    }
  }

  // === Register Screen ===

  _setupRegisterScreen() {
    const form = document.getElementById('register-form');
    const input = document.getElementById('input-player-name');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = input?.value.trim();
        if (name && name.length >= 2) {
          gameState.setPlayerName(name);
          eventBus.emit(EVENTS.TOAST_SHOW, {
            type: 'success',
            message: `خوش آمدی ${name}! ۲۰۰ توکن رایگان دریافت کردی 🎁`
          });
          this._showAlamZar();
        } else {
          eventBus.emit(EVENTS.TOAST_SHOW, {
            type: 'error',
            message: 'لطفاً اسمت رو وارد کن (حداقل ۲ حرف)'
          });
        }
      });
    }
  }

  // === Alam-e Zar Screen ===

  _showAlamZar() {
    this._alamZarStep = 0;
    this._selectedFather = null;
    this._selectedMother = null;
    this._selectedCity = null;
    this.showScreen('screen-alam-zar');
    
    setTimeout(() => {
      this._renderAlamZarStep();
    }, 400);
  }

  _renderAlamZarStep() {
    const container = document.getElementById('alam-zar-content');
    if (!container) return;

    if (this._alamZarStep === 0) {
      this._renderFatherSelection(container);
    } else if (this._alamZarStep === 1) {
      this._renderMotherSelection(container);
    } else if (this._alamZarStep === 2) {
      this._renderCitySelection(container);
    }
  }

  _renderFatherSelection(container) {
    let html = `
      <h3 class="alam-zar__section-title animate-fade-in-up">👨 پدرت رو انتخاب کن</h3>
      <div class="alam-zar__grid stagger-children">
    `;

    FAMILIES.fathers.forEach((father, index) => {
      html += `
        <div class="card card-selectable family-card" data-father-index="${index}" id="father-card-${index}">
          <span class="family-card__emoji">${father.emoji}</span>
          <div class="family-card__name">${father.name}</div>
          <div class="family-card__role">${father.job}</div>
          <div class="family-card__traits">
            ${father.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // Bind clicks
    container.querySelectorAll('[data-father-index]').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.fatherIndex);
        this._selectedFather = FAMILIES.fathers[index];
        
        // Visual feedback
        container.querySelectorAll('.card-selectable').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        // Move to next step after brief delay
        setTimeout(() => {
          this._alamZarStep = 1;
          this._renderAlamZarStep();
        }, 600);
      });
    });
  }

  _renderMotherSelection(container) {
    let html = `
      <h3 class="alam-zar__section-title animate-fade-in-up">👩 مادرت رو انتخاب کن</h3>
      <div class="alam-zar__grid stagger-children">
    `;

    FAMILIES.mothers.forEach((mother, index) => {
      html += `
        <div class="card card-selectable family-card" data-mother-index="${index}" id="mother-card-${index}">
          <span class="family-card__emoji">${mother.emoji}</span>
          <div class="family-card__name">${mother.name}</div>
          <div class="family-card__role">${mother.job}</div>
          <div class="family-card__traits">
            ${mother.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    container.querySelectorAll('[data-mother-index]').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.motherIndex);
        this._selectedMother = FAMILIES.mothers[index];
        
        container.querySelectorAll('.card-selectable').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        setTimeout(() => {
          this._alamZarStep = 2;
          this._renderAlamZarStep();
        }, 600);
      });
    });
  }

  _renderCitySelection(container) {
    let html = `
      <h3 class="alam-zar__section-title animate-fade-in-up">🏙️ شهرت رو انتخاب کن</h3>
      <div class="city-grid stagger-children">
    `;

    FAMILIES.cities.forEach((city, index) => {
      html += `
        <div class="card card-selectable city-card" data-city-index="${index}" id="city-card-${index}">
          <span class="city-card__emoji">${city.emoji}</span>
          <div class="city-card__name">${city.name}</div>
          <div class="city-card__description">${city.description}</div>
        </div>
      `;
    });

    html += `
      </div>
      <div style="text-align: center; margin-top: var(--space-8);">
        <div style="color: var(--clr-text-muted); font-size: var(--fs-sm); margin-bottom: var(--space-4);">
          پدر: <strong style="color: var(--clr-gold);">${this._selectedFather?.name || ''}</strong> | 
          مادر: <strong style="color: var(--clr-gold);">${this._selectedMother?.name || ''}</strong>
        </div>
      </div>
    `;
    container.innerHTML = html;

    container.querySelectorAll('[data-city-index]').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.cityIndex);
        this._selectedCity = FAMILIES.cities[index];
        
        container.querySelectorAll('.card-selectable').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        // Confirm and start game
        setTimeout(() => {
          this._confirmFamilyAndStart();
        }, 800);
      });
    });
  }

  _confirmFamilyAndStart() {
    // Show gameplay screen FIRST so STORY_NEW_EVENT listener is active
    this.showScreen('screen-gameplay');
    this._updateTopBar();
    this._updateStats();

    eventBus.emit(EVENTS.TOAST_SHOW, {
      type: 'success',
      message: `خانواده‌ات انتخاب شد! سفر زندگیت آغاز میشه... ✨`
    });

    // Trigger story engine AFTER a delay so the screen has transitioned
    setTimeout(() => {
      gameState.setFamily(this._selectedFather, this._selectedMother, this._selectedCity);
    }, 600);
  }

  // === Gameplay Screen ===

  _setupGameplayScreen() {
    // Listen for new story events
    eventBus.on(EVENTS.STORY_NEW_EVENT, (event) => {
      this._renderStoryEvent(event);
    });

    // Listen for stat changes
    eventBus.on(EVENTS.STATS_CHANGED, () => {
      this._updateStats();
    });

    // Listen for token changes
    eventBus.on(EVENTS.TOKENS_CHANGED, () => {
      this._updateTopBar();
    });

    // Listen for age ups
    eventBus.on(EVENTS.STORY_AGE_UP, () => {
      this._updateTopBar();
    });

    // Listen for death
    eventBus.on(EVENTS.PLAYER_DIED, (data) => {
      setTimeout(() => {
        this._showDeathScreen(data);
      }, 1000);
    });

    // Shop button
    const shopBtn = document.getElementById('btn-shop');
    if (shopBtn) {
      shopBtn.addEventListener('click', () => {
        eventBus.emit(EVENTS.MODAL_OPEN, { type: 'shop' });
      });
    }

    // Comeback button
    const comebackBtn = document.getElementById('btn-comeback');
    if (comebackBtn) {
      comebackBtn.addEventListener('click', () => {
        if (gameState.canComeback()) {
          const success = tokenSystem.attemptComeback();
          if (success) {
            eventBus.emit(EVENTS.TOAST_SHOW, {
              type: 'info',
              message: 'بازگشت به تصمیم قبلی! (۵۰ توکن کسر شد) ⏪'
            });
            this._updateTopBar();
            this._updateStats();
          }
        } else if (gameState.tokens < 50) {
          eventBus.emit(EVENTS.TOAST_SHOW, {
            type: 'warning',
            message: 'برای بازگشت ۵۰ توکن لازمه!'
          });
        } else {
          eventBus.emit(EVENTS.TOAST_SHOW, {
            type: 'error',
            message: 'امکان بازگشت بیشتر نیست!'
          });
        }
      });
    }

    // Click on narrative to skip typewriter
    const narrativeEl = document.getElementById('narrative-text');
    if (narrativeEl) {
      narrativeEl.addEventListener('click', () => {
        if (typeWriter.isTyping) {
          typeWriter.stop();
          // Show all remaining text immediately
          const paragraphs = this._currentNarrativeText.split('\n').filter(p => p.trim());
          narrativeEl.innerHTML = paragraphs.map(p =>
            `<p style="margin-bottom:0.75rem">${p}</p>`
          ).join('');
        }
      });
    }
  }

  async _renderStoryEvent(event) {
    if (!event) return;

    console.log('📖 Rendering event:', event.id, 'age:', event.age);

    const narrativeEl = document.getElementById('narrative-text');
    const choicesEl   = document.getElementById('choices-container');

    // Clear choices while typing
    if (choicesEl) {
      choicesEl.innerHTML = '';
      choicesEl.style.opacity = '0';
    }

    // Process narrative text
    const processedText = storyEngine.processNarrative(event.narrative);
    this._currentNarrativeText = processedText;

    if (narrativeEl) {
      // Split into paragraphs by \n and type each one
      const paragraphs = processedText.split('\n').filter(p => p.trim());
      narrativeEl.innerHTML = '';

      for (let i = 0; i < paragraphs.length; i++) {
        const p = document.createElement('p');
        p.style.marginBottom = '0.75rem';
        p.style.opacity = '0';
        narrativeEl.appendChild(p);

        // Fade in paragraph container
        await new Promise(r => setTimeout(r, i === 0 ? 0 : 200));
        p.style.transition = 'opacity 0.3s ease';
        p.style.opacity = '1';

        // Type the paragraph text
        await typeWriter.type(p, paragraphs[i], { speed: 18, cursor: i === paragraphs.length - 1 });
      }
    }

    // Fade in choices after typing
    if (event.choices && choicesEl) {
      this._renderChoices(event.choices, choicesEl);
      choicesEl.style.transition = 'opacity 0.5s ease';
      choicesEl.style.opacity = '1';
    }

    this._updateStats();
    this._updateTopBar();
  }

  _renderChoices(choices, container) {
    let html = `<div class="gameplay__choices-title">چه تصمیمی می‌گیری؟</div>`;

    choices.forEach((choice, index) => {
      const typeClass = choice.isGood ? 'choice-good' : 'choice-bad';
      html += `
        <div class="choice-card ${typeClass} animate-fade-in-up" 
             data-choice-index="${index}" 
             style="animation-delay: ${index * 150}ms"
             id="choice-${index}">
          <div class="choice-card__text">${choice.text}</div>
          <div class="choice-card__cost">
            <span>🪙</span>
            <span>${choice.tokenCost} توکن</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Bind choice clicks
    container.querySelectorAll('[data-choice-index]').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.choiceIndex);
        
        // Add clicked animation
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.7';
        
        // Disable all choices
        container.querySelectorAll('.choice-card').forEach(c => {
          c.style.pointerEvents = 'none';
        });

        storyEngine.makeChoice(index);
      });
    });
  }

  _updateTopBar() {
    const tokenEl = document.getElementById('top-bar-tokens');
    const ageEl = document.getElementById('top-bar-age');
    const nameEl = document.getElementById('top-bar-name');

    if (tokenEl) tokenEl.textContent = gameState.tokens;
    if (ageEl) ageEl.textContent = `${gameState.currentAge} سالگی`;
    if (nameEl) nameEl.textContent = gameState.playerName;
  }

  _updateStats() {
    const stats = gameState.stats;
    const statKeys = ['health', 'happiness', 'intelligence', 'wealth', 'social', 'fame'];

    statKeys.forEach(key => {
      const fill = document.getElementById(`stat-fill-${key}`);
      const value = document.getElementById(`stat-value-${key}`);
      
      if (fill) {
        fill.style.width = `${stats[key]}%`;
      }
      if (value) {
        value.textContent = stats[key];
      }
    });
  }

  // === Death Screen ===

  _showDeathScreen(data) {
    this.showScreen('screen-death');

    const deathTitle = document.getElementById('death-title');
    const deathCause = document.getElementById('death-cause');
    const deathSummary = document.getElementById('death-summary');
    const restartBtn = document.getElementById('btn-restart');

    if (deathTitle) {
      deathTitle.textContent = `${gameState.playerName}، ${data.age} ساله`;
    }

    if (deathCause) {
      deathCause.textContent = data.cause;
    }

    if (deathSummary) {
      const summary = gameState.getLifeSummary();
      deathSummary.innerHTML = `
        <div class="death__summary-item">
          <span class="death__summary-label">👨 پدر</span>
          <span class="death__summary-value">${summary.fatherName}</span>
        </div>
        <div class="death__summary-item">
          <span class="death__summary-label">👩 مادر</span>
          <span class="death__summary-value">${summary.motherName}</span>
        </div>
        <div class="death__summary-item">
          <span class="death__summary-label">🏙️ شهر</span>
          <span class="death__summary-value">${summary.cityName}</span>
        </div>
        <div class="death__summary-item">
          <span class="death__summary-label">❤️ سلامت</span>
          <span class="death__summary-value">${summary.stats.health}</span>
        </div>
        <div class="death__summary-item">
          <span class="death__summary-label">😊 شادی</span>
          <span class="death__summary-value">${summary.stats.happiness}</span>
        </div>
        <div class="death__summary-item">
          <span class="death__summary-label">🧠 هوش</span>
          <span class="death__summary-value">${summary.stats.intelligence}</span>
        </div>
        <div class="death__summary-item">
          <span class="death__summary-label">💰 ثروت</span>
          <span class="death__summary-value">${summary.stats.wealth}</span>
        </div>
        <div class="death__summary-item">
          <span class="death__summary-label">📝 تصمیمات</span>
          <span class="death__summary-value">${summary.decisionsCount}</span>
        </div>
        <div class="death__summary-item">
          <span class="death__summary-label">🪙 توکن مصرفی</span>
          <span class="death__summary-value">${summary.totalTokensSpent}</span>
        </div>
        <div class="death__summary-item">
          <span class="death__summary-label">🔄 دفعات بازی</span>
          <span class="death__summary-value">${summary.playCount + 1}</span>
        </div>
      `;
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        gameState.reset();
        this.showScreen('screen-register');
      }, { once: true });
    }
  }

  // === Resume Saved Game ===

  _resumeGame() {
    this.showScreen('screen-gameplay');
    this._updateTopBar();
    this._updateStats();

    // Reload current story event
    const currentEvent = storyEngine.getCurrentEvent();
    if (currentEvent) {
      this._renderStoryEvent(currentEvent);
    } else {
      const currentId = gameState.currentStoryId;
      if (currentId) {
        storyEngine.goToEvent(currentId);
      }
    }

    eventBus.emit(EVENTS.TOAST_SHOW, {
      type: 'info',
      message: 'بازی ذخیره‌شده بارگذاری شد! 📂'
    });
  }

  // === Particles ===

  _createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.width = `${Math.random() * 4 + 2}px`;
      particle.style.height = particle.style.width;
      
      const colors = ['#d4a853', '#8b5cf6', '#2dd4bf', '#3b82f6'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(particle);
    }
  }

  _createStars() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 4 + 2}s`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      container.appendChild(star);
    }
  }
}

export const screenManager = new ScreenManager();
export default ScreenManager;
