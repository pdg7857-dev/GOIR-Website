import { IndustryAuthority, industryMetadata } from "@/components/site/industry-authority";

export const metadata = industryMetadata("plumbing");

export default function Page() {
  return <IndustryAuthority slug="plumbing" />;
}
