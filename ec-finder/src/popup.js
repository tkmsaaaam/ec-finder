(()=> {
    const RAKUTEN = "https://search.rakuten.co.jp/search/mall/";
    const AMAZON = "https://www.amazon.co.jp/s?k=";
    document.getElementsByTagName('button')[0].addEventListener('click', e => {
        e.preventDefault();
        const word = document.getElementsByTagName('input')[0].value;
        chrome.tabs.create({url: RAKUTEN + word})
        chrome.tabs.create({url: AMAZON + word})
    });
    document.getElementsByTagName('button')[1].addEventListener('click', e => {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { message: 'getTitle' },
                response => {
                    let word = '';
                    console.log(response);
                    for (let t of response) {
                        if (t === ' ' || t === '　'){
                            word += '+'
                        } else {
                            word += t
                        }
                    }
                    chrome.tabs.create({url: AMAZON + word})
                }
            );
        });
    })
    document.getElementsByTagName('button')[2].addEventListener('click', e => {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { message: 'getTitle' },
                response => {
                    let word = '';
                    console.log(response);
                    for (let t of response) {
                        if (t === ' ' || t === '　'){
                            word += '+'
                        } else {
                            word += t
                        }
                    }
                    chrome.tabs.create({url: RAKUTEN + word})
                }
            );
        });
    })
})();
