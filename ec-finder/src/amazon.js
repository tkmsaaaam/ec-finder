(()=> {
    chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
        if (request.message === 'getTitle') {
            sendResponse(document.getElementById('productTitle').textContent);
        }
    });
})();
