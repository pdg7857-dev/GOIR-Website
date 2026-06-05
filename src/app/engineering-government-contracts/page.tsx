import { IndustryAuthority, industryMetadata } from "@/components/site/industry-authority";

export const metadata = industryMetadata("engineering");

export default function Page() {
  return <IndustryAuthority slug="engineering" />;
}
