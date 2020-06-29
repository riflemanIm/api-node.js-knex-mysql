import jwt from "jsonwebtoken";
import config from "../config/config";
import md5 from "md5";

export const md5Compare = (pass, hash) => md5(pass) === hash;

export const jwtSign = function (data) {
  return jwt.sign(data, config.secret_key, { expiresIn: "6h" });
};
