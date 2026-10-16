// Content Script for Dasai Font Social

(function () {
  'use strict';

  const STYLE_ID = 'dasai-font-social-override';

  // Single Comic Sans MS font stack with cross-platform fallbacks
  const COMIC_SANS_STACK = "'Comic Sans MS', 'Comic Sans', 'Comic Neue', 'Chalkboard SE', 'Chalkboard', cursive, sans-serif";

  let currentSettings = null;

  // Check if current site is enabled (Always ON globally, respecting per-site toggles)
  function isSiteEnabled(settings) {
    if (!settings) return true;
    const hostname = window.location.hostname;
    const sites = settings.enabledSites || {};

    for (const [domain, isEnabled] of Object.entries(sites)) {
      if (hostname === domain || hostname.endsWith('.' + domain)) {
        return isEnabled !== false;
      }
    }
    // Default to true
    return true;
  }

  // Generate CSS string based on settings
  function generateCSS(settings) {
    if (!isSiteEnabled(settings)) {
      return '';
    }

    const fontFamily = COMIC_SANS_STACK;
    
    let extraRules = '';

    if (settings.wordArtEffect) {
      extraRules += `
        /* 90s WordArt rainbow text (Strict Web-Safe Colors) */
        [data-testid="tweetText"],
        [data-testid="tweetText"] span,
        [data-testid="tweetText"] a,
        #content-text,
        #content-text span,
        yt-formatted-string#content-text {
          background-image: linear-gradient(90deg, #CC0033 0%, #CC6600 16%, #CC9900 33%, #006633 50%, #006699 66%, #003399 83%, #660099 100%) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
          font-weight: bold !important;
        }

        /* Prevent image/svg emojis from vanishing */
        [data-testid="tweetText"] img,
        [data-testid="tweetText"] svg {
          -webkit-text-fill-color: initial !important;
          color: initial !important;
        }
      `;
    }

    if (settings.retroLinkEffect !== false) {
      extraRules += `
        /* Classic 90s Web Links (Web Safe Blue #0000FF, Purple #660099) */
        a,
        a:link,
        a:link *,
        [data-testid="tweetText"] a,
        #content-text a {
          color: #0000FF !important;
          text-decoration: underline !important;
          cursor: pointer !important;
        }

        a:visited,
        a:visited *,
        [data-testid="tweetText"] a:visited,
        #content-text a:visited {
          color: #660099 !important;
        }

        a:active,
        a:active * {
          color: #FF0000 !important;
        }
      `;
    }

    // Comprehensive target selectors for X / Twitter and YouTube
    return `
      /* Dasai Font Social Active Override */
      body,
      button,
      input,
      textarea,
      /* X / Twitter */
      [data-testid="tweetText"],
      [data-testid="tweetText"] *,
      [data-testid="User-Name"],
      [data-testid="User-Name"] *,
      [data-testid="primaryColumn"],
      [data-testid="primaryColumn"] span,
      [data-testid="cellInnerDiv"] span,
      /* YouTube comments & titles */
      #content-text,
      #content-text *,
      ytd-comment-view-model,
      yt-formatted-string {
        font-family: ${fontFamily} !important;
        letter-spacing: 0.05em !important;
      }
      ${extraRules}
    `;
  }

  // Apply or update style tag
  function applyStyles(settings) {
    currentSettings = settings;
    let styleTag = document.getElementById(STYLE_ID);

    const css = generateCSS(settings);

    if (!css) {
      if (styleTag) styleTag.remove();
      return;
    }

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = STYLE_ID;
      const target = document.head || document.documentElement;
      if (target) {
        target.appendChild(styleTag);
      } else {
        // Document head not available yet, listen to DOMContentLoaded
        document.addEventListener('DOMContentLoaded', () => {
          (document.head || document.documentElement).appendChild(styleTag);
        }, { once: true });
      }
    }

    styleTag.textContent = css;
  }

  // Load initial settings
  chrome.storage.sync.get(['dasaiSettings'], (res) => {
    if (chrome.runtime.lastError) return;
    const settings = res.dasaiSettings || {
      enabled: true,
      selectedFont: 'comic-sans',
      wordArtEffect: false,
      retroLinkEffect: true,
      enabledSites: {}
    };
    applyStyles(settings);
  });

  // Listen for settings change in real-time
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.dasaiSettings) {
      applyStyles(changes.dasaiSettings.newValue);
    }
  });

})();
