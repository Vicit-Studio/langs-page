declare module "langs-page" {
  export interface LangConfig {
    defaultLang: string;
    targetLangs: string[];
  }

  export function configure(
    defaultLang: string,
    targetLangs: string[]
  ): LangConfig;

  export function translateText(
    text: string,
    from: string,
    to: string
  ): Promise<string>;

  export const langs: {
    [key: string]: string;
  };

  export function getCode(desiredLang: string): string | false;

  export function isSupported(desiredLang: string): boolean;
}
