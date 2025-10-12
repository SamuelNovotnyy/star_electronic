/** @format */
import DashboardClient from "./page.client";
import { getMessages } from "../../../lib/i18n";
import StarBackground from "@/components/StarBackground";

export default async function DashboardPage({ params }) {
  const { locale } = await params;
  const messages = getMessages(locale);
  return (
    <>
      <StarBackground />
      <DashboardClient locale={locale} messages={messages} />
    </>
  );
}
