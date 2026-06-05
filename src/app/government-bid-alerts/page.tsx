import { MoneyPageView, moneyPageMetadata } from "@/components/site/money-page";

export const metadata = moneyPageMetadata("government-bid-alerts");

export default function Page() {
  return <MoneyPageView slug="government-bid-alerts" />;
}
