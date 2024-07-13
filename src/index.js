const { langs, getCode, isSupported } = require("./languages");
const { translateText } = require("./translate");

function configure(defaultLang, targetLangs) {
  if (!isSupported(defaultLang) || !targetLangs.every(isSupported)) {
    throw new Error("Idioma não suportado na configuração");
  }
  return { defaultLang, targetLangs };
}

module.exports = { configure, translateText, langs, getCode, isSupported };
