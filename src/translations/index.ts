import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import fr from "./fr";
import ru from "./ru";
import LanguageDetector from "i18next-browser-languagedetector";

const user = localStorage.getItem("user");
const { lang } = user != null ? JSON.parse(user) : { lang: "ru" };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: ru,
      en: en,
      fr: fr,
    },
    lng: lang,
    load: "languageOnly",
    fallbackLng: lang,
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    //    keySeparator: false, // we use content as keys

    // interpolation: {
    //   escapeValue: false, // not needed for react!!
    //   formatSeparator: lang === "ru" ? " " : ",",
    // },

    lowerCaseLng: true,
  });

export default i18n;
