import { MoneyPageView, moneyPageMetadata } from "@/components/site/money-page";

export const metadata = moneyPageMetadata("government-contract-expirations");

export default function Page() {
  return <MoneyPageView slug="government-contract-expirations" />;
}
