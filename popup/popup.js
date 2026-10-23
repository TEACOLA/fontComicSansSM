// Popup logic for Dasai Font Social

document.addEventListener('DOMContentLoaded', async () => {
  const wordArtCheck = document.getElementById('wordArtCheck');
  const retroLinkCheck = document.getElementById('retroLinkCheck');
  const previewText = document.getElementById('previewText');
  const counterDisplay = document.getElementById('counterDisplay');
  const counterPrefix = document.getElementById('counterPrefix');
  const counterSuffix = document.getElementById('counterSuffix');

  // 90s Access Counter Setup
  const uiLang = (chrome.i18n.getUILanguage() || navigator.language || '').toLowerCase();
  const isJa = uiLang.startsWith('ja');
  if (isJa) {
    if (counterPrefix) counterPrefix.textContent = 'あなたは';
    if (counterSuffix) counterSuffix.textContent = '人目の訪問者です';
  } else {
    if (counterPrefix) counterPrefix.textContent = 'VISITOR:';
    if (counterSuffix) counterSuffix.textContent = '';
  }

  function renderCounter(num) {
    if (!counterDisplay) return;
    const str = String(num).padStart(6, '0');
    counterDisplay.innerHTML = '';
    for (const ch of str) {
      const span = document.createElement('span');
      span.className = 'counter-digit';
      span.textContent = ch;
      counterDisplay.appendChild(span);
    }
  }

  // Count access each time popup opens
  chrome.storage.local.get(['popupAccessCount'], (result) => {
    const newCount = (result.popupAccessCount || 0) + 1;
    chrome.storage.local.set({ popupAccessCount: newCount });
    renderCounter(newCount);
  });

  const siteCheckboxes = {
    'x.com': document.getElementById('site-x'),
    'youtube.com': document.getElementById('site-youtube')
  };

  const PREVIEW_QUOTES = [
    'All your base are belong to us',
    "You've got mail!",
    "Don't feed the trolls",
    'kita---(*ﾟ∀ﾟ*)---!!',
    ':-)'
  ];

  if (previewText) {
    const randomQuote = PREVIEW_QUOTES[Math.floor(Math.random() * PREVIEW_QUOTES.length)];
    previewText.textContent = randomQuote;
  }

  const COMIC_SANS_FONT = "'Comic Sans MS', 'Comic Sans', 'Comic Neue', 'Chalkboard SE', 'Chalkboard', cursive, sans-serif";

  let currentSettings = {
    enabled: true,
    selectedFont: 'comic-sans',
    wordArtEffect: false,
    retroLinkEffect: true, // デフォルトでONに！
    enabledSites: {
      'x.com': true,
      'twitter.com': true,
      'youtube.com': true
    }
  };

  // Update preview box based on current settings
  function updatePreview() {
    previewText.style.opacity = '1.0';
    previewText.style.fontFamily = COMIC_SANS_FONT;
    previewText.style.transform = 'none';

    if (currentSettings.wordArtEffect) {
      previewText.classList.add('wordart-rainbow');
    } else {
      previewText.classList.remove('wordart-rainbow');
    }
  }

  // Update UI components
  function updateUI() {
    wordArtCheck.checked = !!currentSettings.wordArtEffect;
    retroLinkCheck.checked = currentSettings.retroLinkEffect !== false;

    for (const [siteKey, el] of Object.entries(siteCheckboxes)) {
      if (el) {
        el.checked = currentSettings.enabledSites[siteKey] !== false;
      }
    }

    updatePreview();
  }

  // Save settings to chrome.storage
  async function saveSettings() {
    await chrome.storage.sync.set({ dasaiSettings: currentSettings });
    updatePreview();
  }

  // Event Listeners

  wordArtCheck.addEventListener('change', async () => {
    currentSettings.wordArtEffect = wordArtCheck.checked;
    updatePreview();
    await saveSettings();
  });

  retroLinkCheck.addEventListener('change', async () => {
    currentSettings.retroLinkEffect = retroLinkCheck.checked;
    updatePreview();
    await saveSettings();
  });

  for (const [siteKey, el] of Object.entries(siteCheckboxes)) {
    if (el) {
      el.addEventListener('change', async () => {
        currentSettings.enabledSites[siteKey] = el.checked;
        if (siteKey === 'x.com') {
          currentSettings.enabledSites['twitter.com'] = el.checked;
        }
        await saveSettings();
      });
    }
  }

  // Window control buttons (decorative + functional)
  document.querySelector('[aria-label="Close"]')?.addEventListener('click', () => {
    window.close();
  });

  // Load saved settings
  const stored = await chrome.storage.sync.get(['dasaiSettings']);
  if (stored.dasaiSettings) {
    currentSettings = {
      ...currentSettings,
      ...stored.dasaiSettings,
      enabledSites: {
        ...currentSettings.enabledSites,
        ...(stored.dasaiSettings.enabledSites || {})
      }
    };
  }
  updateUI();
});
