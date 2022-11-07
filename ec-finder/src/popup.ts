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

type SiteList = Site[];
type Site = {
	name: string;
	html: HTMLButtonElement;
	url: string;
};
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
	SEARCH_BUTTON.addEventListener('click', (e: MouseEvent): void => {
		e.preventDefault();
		const word: string = (
			document.getElementsByTagName('input')[0] as HTMLInputElement
		).value.replaceAll(' ' || '　', '+');
		chrome.tabs.create({ url: AMAZON_URL + word }).then();
		chrome.tabs.create({ url: RAKUTEN_URL + word }).then();
	});
	for (let site of siteList) {
		site.html.addEventListener('click', (): void => {
			chrome.tabs.query(
				{ active: true, lastFocusedWindow: true },
				(tabs: chrome.tabs.Tab[]): void => {
					chrome.tabs.sendMessage(
						tabs[0].id as number,
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
