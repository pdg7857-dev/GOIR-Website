import { MoneyPageView, moneyPageMetadata } from "@/components/site/money-page";

export const metadata = moneyPageMetadata("opportunity-screening");

export default function Page() {
  return <MoneyPageView slug="opportunity-screening" />;
}
