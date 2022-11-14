const RAKUTEN: string = 'RAKUTEN';
const AMAZON: string = 'AMAZON';

const RAKUTEN_URL: string = 'https://search.rakuten.co.jp/search/mall/';
const AMAZON_URL: string = 'https://www.amazon.co.jp/s?k=';

type SiteList = {
	name: string;
	url: string;
	id: number;
}[];
const siteList: SiteList = [
	{
		name: AMAZON,
		url: AMAZON_URL,
		id: 1,
	},
	{
		name: RAKUTEN,
		url: RAKUTEN_URL,
		id: 2,
	},
];

((): void => {
	for (let site of siteList) {
		chrome.tabs.query(
			{ active: true, lastFocusedWindow: true },
			(tabs: chrome.tabs.Tab[]): void => {
				if (!tabs[0].url) return;
				if (tabs[0].url.includes(site.name.toLowerCase()))
					document.getElementsByTagName('button')[site.id].disabled = true;
			}
		);
	}
	document
		.getElementsByTagName('button')[0]
		.addEventListener('click', (e: MouseEvent): void => {
			e.preventDefault();
			const word: string = (
				document.getElementsByTagName('input')[0] as HTMLInputElement
			).value.replaceAll(' ' || '　', '+');
			for (let site of siteList) {
				chrome.tabs.create({ url: site.url + word }).then();
			}
		});
	for (let site of siteList) {
		document
			.getElementsByTagName('button')
			[site.id].addEventListener('click', (): void => {
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
