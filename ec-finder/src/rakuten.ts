(() => {
	chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
		if (request.message === 'getTitle') {
			sendResponse(
				(
					(
						document.getElementById('productTitle') as HTMLDivElement
					).getElementsByTagName('h1')[0] as HTMLHeadElement
				).textContent
			);
		}
	});
})();
