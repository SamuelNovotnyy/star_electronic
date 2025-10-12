/** @format */
import fs from "fs";
import path from "path";
import { defaultLocale } from "../i18n.config";

export function getMessages(locale) {
  try {
    const p = path.join(process.cwd(), "messages", `${locale}.json`);
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    const p = path.join(process.cwd(), "messages", `${defaultLocale}.json`);
    return JSON.parse(fs.readFileSync(p, "utf8"));
  }
}
