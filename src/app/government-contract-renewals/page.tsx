import { MoneyPageView, moneyPageMetadata } from "@/components/site/money-page";

export const metadata = moneyPageMetadata("government-contract-renewals");

export default function Page() {
  return <MoneyPageView slug="government-contract-renewals" />;
}
