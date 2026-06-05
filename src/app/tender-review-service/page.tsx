import { MoneyPageView, moneyPageMetadata } from "@/components/site/money-page";

export const metadata = moneyPageMetadata("tender-review-service");

export default function Page() {
  return <MoneyPageView slug="tender-review-service" />;
}
