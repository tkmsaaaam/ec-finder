const RAKUTEN: string = 'RAKUTEN';
const AMAZON: string = 'AMAZON';

const SEARCH_BUTTON: HTMLButtonElement =
	document.getElementsByTagName('button')[0];
const AMAZON_BUTTON: HTMLButtonElement =
	document.getElementsByTagName('button')[1];
const RAKUTEN_BUTTON: HTMLButtonElement =
	document.getElementsByTagName('button')[2];

const RAKUTEN_URL: string = 'https://search.rakuten.co.jp/search/mall/';
const AMAZON_URL: string = 'https://www.amazon.co.jp/s?k=';

type SiteList = {
	name: string;
	html: HTMLButtonElement;
	url: string;
}[];
const siteList: SiteList = [
	{
		name: AMAZON,
		html: AMAZON_BUTTON,
		url: AMAZON_URL,
	},
	{
		name: RAKUTEN,
		html: RAKUTEN_BUTTON,
		url: RAKUTEN_URL,
	},
];

((): void => {
	for (let site of siteList) {
		chrome.tabs.query(
			{ active: true, lastFocusedWindow: true },
			(tabs: chrome.tabs.Tab[]): void => {
				if (!tabs[0].url) return;
				if (tabs[0].url.includes(site.name.toLowerCase()))
					site.html.disabled = true;
			}
		);
	}
	SEARCH_BUTTON.addEventListener('click', (e: MouseEvent): void => {
		e.preventDefault();
		const word: string = (
			document.getElementsByTagName('input')[0] as HTMLInputElement
		).value.replaceAll(' ' || '　', '+');
		for (let site of siteList) {
			chrome.tabs.create({ url: site.url + word }).then();
		}
	});
	for (let site of siteList) {
		site.html.addEventListener('click', (): void => {
			chrome.tabs.query(
				{ active: true, lastFocusedWindow: true },
				(tabs: chrome.tabs.Tab[]): void => {
					if (!tabs[0].id) return;
					chrome.tabs.sendMessage(
						tabs[0].id,
						{ message: 'getTitle' },
						(response): void => {
							chrome.tabs
								.create({
									url: site.url + response.replaceAll(' ' || '　', '+'),
								})
								.then();
						}
					);
				}
			);
		});
	}
})();
