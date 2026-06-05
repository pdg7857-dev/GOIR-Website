import { IndustryAuthority, industryMetadata } from "@/components/site/industry-authority";

export const metadata = industryMetadata("security");

export default function Page() {
  return <IndustryAuthority slug="security" />;
}
