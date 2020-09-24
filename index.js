const puppeteer = require("puppeteer");
const fs = require("fs");

async function start(url, seletor) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await await page.goto(url);
  const nomes = await page.$$eval(`.${seletor}`, (nome) =>
    nome.map((nome) => nome.innerText)
  );
  // const links = await page.$$eval(".fnmrjs-0", (links) =>
  //   links.map((link) => link.href)
  // );
  let produtos = []
  let html = "";
  nomes.forEach((nome, index) => {
      produtos[index] = nome
      html +=  `
        <h3>${produtos[index]}</h3>
    `
  })
  // links.forEach((link, index) => {
  //   html +=  `
  //       <h3>${produtos[index]}</h3>
  //       <a href="${link}">Ver</a>
  //   `
  // });
  fs.writeFileSync(`./${Date.now()}.html`, html,{flag: 'a+'}, function(err) {
      if(err){
        console.log("Erro ou gerar txt: " + err);
        throw err;
      }
  });

  console.log(produtos);
  browser.close();
}
start("https://www.naointendo.com.br/", "title");