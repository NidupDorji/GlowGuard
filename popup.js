document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggleDarkMode");
    const statusText = document.getElementById("status");
  
    // Get the current site
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentSite = new URL(tabs[0].url).hostname;
  
      // Check if dark mode is enabled for this site
      chrome.storage.sync.get(["enabledSites"], (data) => {
        const enabledSites = data.enabledSites || [];
  
        // Update button text
        const isDarkModeOn = enabledSites.includes(currentSite);
        toggleBtn.textContent = isDarkModeOn ? "Turn OFF" : "Turn ON";
        statusText.textContent = `Dark Mode: ${isDarkModeOn ? "ON" : "OFF"}`;
      });
    });
  
    // Toggle Dark Mode on button click
    toggleBtn.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDarkMode" });
  
        // Update storage and button text
        chrome.storage.sync.get(["enabledSites"], (data) => {
          const enabledSites = data.enabledSites || [];
          const currentSite = new URL(tabs[0].url).hostname;
          
          if (enabledSites.includes(currentSite)) {
            enabledSites.splice(enabledSites.indexOf(currentSite), 1); // Remove site
          } else {
            enabledSites.push(currentSite); // Add site
          }
  
          chrome.storage.sync.set({ enabledSites }, () => {
            toggleBtn.textContent = enabledSites.includes(currentSite) ? "Turn OFF" : "Turn ON";
            statusText.textContent = `Dark Mode: ${enabledSites.includes(currentSite) ? "ON" : "OFF"}`;
          });
        });
      });
    });
  });
  