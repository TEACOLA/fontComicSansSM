// Service Worker for Dasai Font Social

const DEFAULT_SETTINGS = {
  enabled: true,
  selectedFont: 'comic-sans', // Dedicated to Comic Sans MS
  wordArtEffect: false,     // 90s WordArt rainbow text gradient
  retroLinkEffect: true,    // classic 90s web links (blue unvisited, purple visited)
  enabledSites: {
    'x.com': true,
    'twitter.com': true,
    'youtube.com': true
  }
};

// Initialize settings on installation
chrome.runtime.onInstalled.addListener(async () => {
  const stored = await chrome.storage.sync.get(['dasaiSettings']);
  if (!stored.dasaiSettings) {
    await chrome.storage.sync.set({ dasaiSettings: DEFAULT_SETTINGS });
  }
  await chrome.action.setBadgeText({ text: '' });
});

// Ensure badge is cleared when Service Worker starts up
chrome.action.setBadgeText({ text: '' });
