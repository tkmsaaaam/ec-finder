(() => {
	chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
		if (request.message === 'getTitle') {
			sendResponse(
				document.getElementById('productTitle')?.getElementsByTagName('h1')[0]
					.textContent
			);
		}
	});
})();
