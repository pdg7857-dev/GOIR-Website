import { IndustryAuthority, industryMetadata } from "@/components/site/industry-authority";

export const metadata = industryMetadata("electrical");

export default function Page() {
  return <IndustryAuthority slug="electrical" />;
}
