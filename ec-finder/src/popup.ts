const ALL = 'ALL';
const RAKUTEN = 'RAKUTEN';
const AMAZON = 'AMAZON';

const makeQueryParam = (word: string): string => {
	return word.replaceAll(' ' || '　', '+');
};

const createTabs = (word: string, site: string): void => {
	if (site === RAKUTEN || site === ALL) {
		chrome.tabs
			.create({ url: 'https://search.rakuten.co.jp/search/mall/' + word })
			.then();
	}
	if (site === AMAZON || site === ALL) {
		chrome.tabs.create({ url: 'https://www.amazon.co.jp/s?k=' + word }).then();
	}
};

((): void => {
	(
		document.getElementsByTagName('button')[0] as HTMLButtonElement
	).addEventListener('click', (e: MouseEvent): void => {
		e.preventDefault();
		const word: string = makeQueryParam(
			(document.getElementsByTagName('input')[0] as HTMLInputElement).value
		);
		createTabs(word, ALL);
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
						createTabs(makeQueryParam(response), AMAZON);
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
						createTabs(makeQueryParam(response), RAKUTEN);
					}
				);
			}
		);
	});
})();
