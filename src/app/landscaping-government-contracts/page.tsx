import { IndustryAuthority, industryMetadata } from "@/components/site/industry-authority";

export const metadata = industryMetadata("landscaping");

export default function Page() {
  return <IndustryAuthority slug="landscaping" />;
}
