(() => {
    // Function to apply dark mode
    function enableDarkMode() {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    }
  
    // Function to disable dark mode
    function disableDarkMode() {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  
    // Check user preference
    if (localStorage.getItem("darkMode") === "enabled") {
      enableDarkMode();
    }
  
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request) => {
      if (request.action === "toggleDarkMode") {
        if (document.documentElement.classList.contains("dark-mode")) {
          disableDarkMode();
        } else {
          enableDarkMode();
        }
      }
    });
  })();
  