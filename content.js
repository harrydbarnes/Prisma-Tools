function replaceLogo() {
    const logoElement = document.querySelector('mo-banner .logo');
    if (logoElement) {
        const newLogo = document.createElement('img');
        newLogo.src = chrome.runtime.getURL('icon.png');
        newLogo.style.width = '32px';
        newLogo.style.height = '32px';
        newLogo.className = 'custom-logo';
        logoElement.parentNode.replaceChild(newLogo, logoElement);
    }
}

function restoreOriginalLogo() {
    const customLogo = document.querySelector('mo-banner .custom-logo');
    if (customLogo) {
        const originalLogo = document.createElement('i');
        originalLogo.className = 'logo';
        customLogo.parentNode.replaceChild(originalLogo, customLogo);
    }
}

// Rest of the content.js remains the same
function checkAndReplaceLogo() {
    chrome.storage.sync.get('logoReplaceEnabled', function(data) {
        if (data.logoReplaceEnabled) {
            replaceLogo();
        } else {
            restoreOriginalLogo();
        }
    });
}

// Initial check and replace
checkAndReplaceLogo();

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleLogo") {
        checkAndReplaceLogo();
    }
});

// Observe DOM changes to handle dynamic content loading
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            checkAndReplaceLogo();
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
