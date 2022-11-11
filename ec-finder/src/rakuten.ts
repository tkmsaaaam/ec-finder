((): void => {
	chrome.runtime.onMessage.addListener((request, _, sendResponse): void => {
		if (request.message === 'getTitle') {
			let response = null;
			if (document.getElementById('productTitle'))
				response = (document.getElementById('productTitle') as HTMLSpanElement)
					.textContent;
			if (!response)
				response = (
					document.getElementById('item-name') as HTMLParagraphElement
				).textContent;
			sendResponse(response);
		}
	});
})();
