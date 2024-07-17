const { getCode, isSupported } = require("./languages");

async function translateText(text, from, to) {
  from = getCode(from) || "auto";
  to = getCode(to) || "en";

  if (!isSupported(from) || !isSupported(to)) {
    throw new Error("Idioma não suportado");
  }

  const url =
    "https://translate.google.com/translate_a/single?client=gtx&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=" +
    to +
    "&ie=UTF-8&oe=UTF-8&inputm=2&otf=2";

  const data = {
    sl: from,
    tl: to,
    q: text,
  };

  const params = new URLSearchParams(data);

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: params,
    });

    const responseData = await response.json();
    const translatedText = responseData.sentences
      .map((sentence) => sentence.trans)
      .join("");

    return translatedText;
  } catch (error) {
    throw new Error("Tradução falhou");
  }
}

module.exports = { translateText };
