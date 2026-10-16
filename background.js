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
  updateBadge();
});

// Update badge status (Always ON)
async function updateBadge() {
  await chrome.action.setBadgeText({ text: 'S' });
  await chrome.action.setBadgeBackgroundColor({ color: '#000066' }); // Web safe Netscape navy
}

// Ensure badge is set when Service Worker starts up
updateBadge();
