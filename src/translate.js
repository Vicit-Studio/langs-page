const axios = require("axios");
const { getCode, isSupported } = require("./languages");

async function translateText(text, from, to) {
  from = getCode(from) || "auto";
  to = getCode(to) || "en";

  if (!isSupported(from) || !isSupported(to)) {
    throw new Error("Idioma não suportado");
  }

  const url =
    "https://translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=" +
    to +
    "&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e";

  const data = {
    sl: from,
    tl: to,
    q: text,
  };

  const params = new URLSearchParams(data);

  try {
    const response = await axios.post(url, params, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const responseData = response.data;

    return responseData.sentences[0].trans;
  } catch (error) {
    throw new Error("Tradução falhou");
  }
}

module.exports = { translateText };
