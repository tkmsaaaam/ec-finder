((): void => {
	const RAKUTEN: string = 'https://search.rakuten.co.jp/search/mall/';
	const AMAZON: string = 'https://www.amazon.co.jp/s?k=';
	(
		document.getElementsByTagName('button')[0] as HTMLButtonElement
	).addEventListener('click', (e: MouseEvent): void => {
		e.preventDefault();
		const word: string = (
			document.getElementsByTagName('input')[0] as HTMLInputElement
		).value;
		chrome.tabs.create({ url: RAKUTEN + word }).then();
		chrome.tabs.create({ url: AMAZON + word }).then();
	});
	(
		document.getElementsByTagName('button')[1] as HTMLButtonElement
	).addEventListener('click', (): void => {
		chrome.tabs.query(
			{ active: true, lastFocusedWindow: true },
			(tabs: chrome.tabs.Tab[]): void => {
				chrome.tabs.sendMessage(
					tabs[0].id as number,
					{ message: 'getTitle' },
					(response): void => {
						const word = response.replaceAll(' ' || '　', '+');
						chrome.tabs.create({ url: AMAZON + word }).then();
					}
				);
			}
		);
	});
	(
		document.getElementsByTagName('button')[2] as HTMLButtonElement
	).addEventListener('click', (): void => {
		chrome.tabs.query(
			{ active: true, lastFocusedWindow: true },
			(tabs: chrome.tabs.Tab[]) => {
				chrome.tabs.sendMessage(
					tabs[0].id as number,
					{ message: 'getTitle' },
					(response): void => {
						const word: string = response.replaceAll(' ' || '　', '+');
						chrome.tabs.create({ url: RAKUTEN + word }).then();
					}
				);
			}
		);
	});
})();
