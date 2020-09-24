const puppetter = require('puppeteer');
(async () => {
    const browser = await puppetter.launch({
        // headless: false
    })
    let obj = []
    const page = await browser.newPage();
    await page.goto('https://lista.mercadolivre.com.br/pc-gamer#D[A:pc%20gamer]');
    const nomes = await page.$$eval(".item__price", (nome) => 
        nome.map((nome) => obj.push(nome.innerText))
    );
    const links = await page.$$eval(".item__info-link", (links) =>
        links.map((link) => obj.push(link.href))
    );

    nomes.forEach(nome => {
        obj.nome = nome
    })

    links.forEach(link => {
        console.log(link);
    })

    console.log(obj);
    // console.log(links);
    await browser.close();
})();