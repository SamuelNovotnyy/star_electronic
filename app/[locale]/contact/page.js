/** @format */
import ContactForm from "../../../components/ContactForm";
import { getMessages } from "../../../lib/i18n";

export const metadata = { title: "Contact - Star Electronic" };

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const messages = getMessages(locale);
  const t = (key, fallback) =>
    key
      .split(".")
      .reduce(
        (o, k) => (o && o[k] !== undefined ? o[k] : undefined),
        messages
      ) ??
    fallback ??
    key;
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("contact.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("contact.intro")}</p>
      <ContactForm messages={messages} />
    </div>
  );
}
