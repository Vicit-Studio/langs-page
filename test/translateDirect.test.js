const { expect } = require("chai");
const { translateText } = require("../src/translate");

describe("Teste de tradução direta", () => {
  it("Deve traduzir todo o texto corretamente", async () => {
    const originalText =
      "Pacote JavaScript para integração com a API de tradução do Google. Suporta tradução automática entre vários idiomas.";

    const translatedText = await translateText(originalText, "pt", "en");

    // Verifica se o texto traduzido contém a frase esperada
    expect(translatedText).to.include("JavaScript package for integration");

    // Testa com o texto original para garantir que a tradução não está vindo vazia
    expect(translatedText).to.not.equal(originalText);
  });
});
