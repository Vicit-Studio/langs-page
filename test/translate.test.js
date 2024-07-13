const { expect } = require("chai");
const { translateText } = require("../src/translate");

describe("Teste de tradução", () => {
  it("Deve traduzir o texto", async () => {
    const result = await translateText("Hello World", "en", "pt");
    expect(result).to.equal("Olá Mundo");
  });
});
