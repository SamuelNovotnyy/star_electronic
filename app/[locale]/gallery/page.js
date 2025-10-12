/** @format */
import GalleryGrid from "../../../components/GalleryGrid";
import { getMessages } from "../../../lib/i18n";

export default async function GalleryPage({ params }) {
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
      <h1 className="text-3xl font-bold mb-6">{t("gallery.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("gallery.intro")}</p>
      <GalleryGrid folder="star_electronic_gallery" />
    </div>
  );
}
