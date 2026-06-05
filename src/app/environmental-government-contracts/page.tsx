import { IndustryAuthority, industryMetadata } from "@/components/site/industry-authority";

export const metadata = industryMetadata("environmental");

export default function Page() {
  return <IndustryAuthority slug="environmental" />;
}
