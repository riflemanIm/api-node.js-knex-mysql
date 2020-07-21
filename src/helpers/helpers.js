import jwt from "jsonwebtoken";
import config from "../config/config";
import md5 from "md5";

export const md5Compare = (pass, hash) => md5(pass) === hash;

export const jwtSign = (data) =>
  jwt.sign(data, config.secret_key, { expiresIn: "6h" });

export const defLangObj = (lang, content, checked) => {
  if (lang === "ru") return { lang_ru: content, checked_ru: checked };
  if (lang === "en") return { lang_en: content, checked_en: checked };
  if (lang === "fr") return { lang_fr: content, checked_fr: checked };
};

export const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
export const localDateTime = new Date(Date.now() - tzoffset)
  .toISOString()
  .slice(0, 19)
  .replace("T", " ");
