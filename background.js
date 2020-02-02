browser.browserAction.onClicked.addListener(getTitle);

function getTitle(tab) {  
    browser.browserAction.getTitle({tabId: tab.id}).then(toggleTitle);
    
    function toggleTitle(title) {
        if (title === "Open Pesticide") {
            browser.browserAction.setTitle({tabId: tab.id, title: "Enabled (Open Pesticide)"});
            browser.browserAction.setIcon({tabId: tab.id, path: "icons/enabled-16.png"});
            browser.tabs.insertCSS({file: "style.css"});
        } else {
            browser.browserAction.setTitle({tabId: tab.id, title: "Open Pesticide"});
            browser.browserAction.setIcon({tabId: tab.id, path: "icons/disabled-16.png"});
            browser.tabs.removeCSS({file: "style.css"});
        }
    }
}

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    init(tab);
});

function init(tab) {
    browser.browserAction.setTitle({tabId: tab.id, title: "Open Pesticide"});
    browser.browserAction.setIcon({tabId: tab.id, path: "icons/disabled-16.png"});
    browser.browserAction.show(tab.id);
}
