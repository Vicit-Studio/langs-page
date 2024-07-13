const { expect } = require("chai");
const { translateText } = require("../src/translate");

describe("Teste de tradução direta", () => {
  it("Deve traduzir todo o texto direto", async () => {
    const translatedText = await translateText(
      "Pacote JavaScript para integração com a API de tradução do Google. Suporta tradução automática entre vários idiomas.",
      "pt",
      "en"
    );

    expect(translatedText).to.include("JavaScript package for integration");
  });
});
