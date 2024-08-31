import translate, { googleTranslateApi } from "google-translate-api-x";
import { JSONObject, extractStringsFromJSON, mapStringsToJSON } from "./json";

type TranslateFunction = (
  strings: string[],
  language: string,
) => Promise<googleTranslateApi.TranslationResponse[]>;

export async function translateJSON(
  json: JSONObject,
  language: string,
  translateFunction: TranslateFunction = translateStrings,
): Promise<JSONObject> {
  const { strings, paths } = extractStringsFromJSON(json);
  const translations = await translateFunction(strings, language).then(
    (res) => {
      return res.map((tr) => tr.text);
    },
  );
  return mapStringsToJSON(json, translations, paths);
}

export async function translateStrings(data: string[], lang: string) {
  return await translate(data, {
    to: lang,
  });
}
