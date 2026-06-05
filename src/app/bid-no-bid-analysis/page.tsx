import { MoneyPageView, moneyPageMetadata } from "@/components/site/money-page";

export const metadata = moneyPageMetadata("bid-no-bid-analysis");

export default function Page() {
  return <MoneyPageView slug="bid-no-bid-analysis" />;
}
