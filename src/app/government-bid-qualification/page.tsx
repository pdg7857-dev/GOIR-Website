import { MoneyPageView, moneyPageMetadata } from "@/components/site/money-page";

export const metadata = moneyPageMetadata("government-bid-qualification");

export default function Page() {
  return <MoneyPageView slug="government-bid-qualification" />;
}
