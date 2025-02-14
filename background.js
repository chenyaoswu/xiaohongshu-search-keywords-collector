chrome.commands.onCommand.addListener((command) => {
    if (command === "_execute_action") {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "showDialog"});
      });
    }
  });