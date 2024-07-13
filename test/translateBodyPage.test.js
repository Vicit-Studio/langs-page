const { expect } = require("chai");
const { JSDOM } = require("jsdom");
const { translateText } = require("../src/translate");

describe("Teste de tradução de HTML", () => {
  it("Deve traduzir todo o texto dentro do HTML", async () => {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Teste</title>
        </head>
        <body>
          <h1>
            Pacote JavaScript para integração com a API de tradução do Google. Suporta
            tradução automática entre vários idiomas.
          </h1>
          <h2>Aqui você vê como ele traduz todo o arquivo</h2>
        </body>
      </html>
    `;

    const dom = new JSDOM(html);

    const bodyText = dom.window.document.body.textContent;

    console.log("Texto a ser traduzido:", bodyText);

    const translatedText = await translateText(bodyText, "pt", "en");

    console.log("Texto traduzido", translatedText);

    expect(translatedText).to.include(
      "JavaScript package for integration",
      "Here you see how it translates the entire file"
    );
  });
});
