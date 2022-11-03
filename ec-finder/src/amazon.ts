((): void => {
	chrome.runtime.onMessage.addListener((request, _, sendResponse): void => {
		if (request.message === 'getTitle') {
			sendResponse(
				(document.getElementById('productTitle') as HTMLSpanElement).textContent
			);
		}
	});
})();
