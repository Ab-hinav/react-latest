// @ts-ignore
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'RUN_LINKEDIN_PARSER') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['contentScript.js'] // compiled from contentScript.ts
                });
            }
        });
    }
});