(() => {
	const RAKUTEN = 'https://search.rakuten.co.jp/search/mall/';
	const AMAZON = 'https://www.amazon.co.jp/s?k=';
	document.getElementsByTagName('button')[0].addEventListener('click', e => {
		e.preventDefault();
		const word = document.getElementsByTagName('input')[0].value;
		chrome.tabs.create({ url: RAKUTEN + word }).then();
		chrome.tabs.create({ url: AMAZON + word }).then();
	});
	document.getElementsByTagName('button')[1].addEventListener('click', () => {
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.tabs.sendMessage(tabs[0].id, { message: 'getTitle' }, response => {
				const word = response.replaceAll(' ' || '　', '+');
				chrome.tabs.create({ url: AMAZON + word }).then();
			});
		});
	});
	document.getElementsByTagName('button')[2].addEventListener('click', () => {
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
			chrome.tabs.sendMessage(tabs[0].id, { message: 'getTitle' }, response => {
				const word = response.replaceAll(' ' || '　', '+');
				chrome.tabs.create({ url: RAKUTEN + word }).then();
			});
		});
	});
})();
