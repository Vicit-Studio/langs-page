![Logo](https://i.imgur.com/SYwLxUU.png)

# Langs Page

Pacote JavaScript para integração com a API de tradução do Google. Suporta tradução automática entre vários idiomas.

## Instalação

_Instale o pacote usando npm ou yarn:_

_npm_

```bash
  npm install langs-page
```

_yarn_

```bash
  yarn add langs-page
```

## Exemplos

_Você pode usar as funções com [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) para melhorar a performance e UX:_

- Crie o arquivo _translateService.js_ no seu projeto. Este arquivo irá conter a lógica para configurar o Service Worker e traduzir os textos na página.

```javascript
import { configure, translateText, langs } from "langs-page";

let config = {};
let serviceWorkerInitialized = false;
let serviceWorkerRegistration = null;

// Configuração inicial do pacote
export function setupTranslation(defaultLang, targetLangs) {
  try {
    config = configure(defaultLang, targetLangs);
  } catch (error) {
    console.error("Erro na configuração de idioma:", error.message);
  }
}

// Função para traduzir um texto diretamente
export async function translateTextDirect(text, toLang) {
  try {
    const translation = await translateText(text, config.defaultLang, toLang);
    return translation;
  } catch (error) {
    console.error("Erro na tradução:", error.message);
    return text; // Retorna o texto original em caso de erro
  }
}

// Função para traduzir um texto usando Service Worker
export async function translateTextUsingServiceWorker(text, toLang) {
  if (!serviceWorkerInitialized) {
    await initializeServiceWorker();
  }

  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      if (event.data.translated) {
        resolve(event.data.translated);
      } else {
        reject(new Error("Tradução falhou no Service Worker"));
      }
    };

    navigator.serviceWorker.controller.postMessage(
      {
        type: "TRANSLATE_TEXT",
        text,
        toLang,
        defaultLang: config.defaultLang,
      },
      [messageChannel.port2]
    );
  });
}

// Retorna a lista de idiomas suportados
export function getSupportedLanguages() {
  return Object.keys(langs).map((key) => ({ code: key, name: langs[key] }));
}

// Função para inicializar o Service Worker
async function initializeServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      serviceWorkerRegistration = registration;
      serviceWorkerInitialized = true;
    } catch (error) {
      console.error("Falha ao registrar o Service Worker:", error.message);
    }
  } else {
    console.error("Service Worker não é suportado neste navegador.");
  }
}

// Listener para mensagens do Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", async (event) => {
    const { type, text, toLang, defaultLang } = event.data;

    if (type === "TRANSLATE_TEXT") {
      try {
        const translation = await translateTextDirect(
          text,
          defaultLang,
          toLang
        );
        event.ports[0].postMessage({ translated: translation });
      } catch (error) {
        console.error(
          "Erro ao traduzir texto no Service Worker:",
          error.message
        );
        event.ports[0].postMessage({ translated: text }); // Retorna o texto original em caso de erro
      }
    }
  });
}
```

- Agora, integre o serviço de tradução no seu componente principal React incluindo um dropdown de idiomas para seleção e a tradução dos textos da página.

```javascript
import React, { useState, useEffect } from "react";
import {
  setupTranslation,
  translateTextUsingServiceWorker,
  getSupportedLanguages,
} from "./translateService";
import { langs } from "langs-page";

export default function App() {
  // Configurando idiomas padrão e de destino
  const { defaultLang, targetLangs } = setupTranslation("pt", ["en", "es"]);

  const [currentLang, setCurrentLang] = useState(defaultLang);
  const [translatedText, setTranslatedText] = useState("");

  // Lista de idiomas suportados para dropdown
  const supportedLanguages = getSupportedLanguages();

  // Função para traduzir o texto
  const translatePage = async () => {
    const textToTranslate = document.body.innerText;

    try {
      const translated = await translateTextUsingServiceWorker(
        textToTranslate,
        currentLang
      );
      setTranslatedText(translated);
    } catch (error) {
      console.error("Erro ao traduzir:", error.message);
    }
  };

  useEffect(() => {
    translatePage(); // Traduz a página ao carregar
  }, [currentLang]);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentLang(e.target.value);
  };

  return (
    <div>
      <select value={currentLang} onChange={handleLangChange}>
        {supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.code.toUpperCase()} - {lang.name}
          </option>
        ))}
      </select>

      <div dangerouslySetInnerHTML={{ __html: translatedText }} />
    </div>
  );
}
```

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

## Autores

- [@afiovinicius](https://www.github.com/afiovinicius)
