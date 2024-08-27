function replaceLogo() {
    const logoElement = document.querySelector('div.left > i.logo');
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
    const customLogo = document.querySelector('div.left > img.custom-logo');
    if (customLogo) {
        const originalLogo = document.createElement('i');
        originalLogo.className = 'logo';
        customLogo.parentNode.replaceChild(originalLogo, customLogo);
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "checkLogoReplaceEnabled") {
        if (request.enabled) {
            replaceLogo();
        } else {
            restoreOriginalLogo();
        }
    }
});

// Initial check
chrome.runtime.sendMessage({action: "getLogoReplaceEnabled"});

// Observe DOM changes to handle dynamic content loading
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            chrome.runtime.sendMessage({action: "getLogoReplaceEnabled"});
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
