import { IndustryAuthority, industryMetadata } from "@/components/site/industry-authority";

export const metadata = industryMetadata("industrial-supplies");

export default function Page() {
  return <IndustryAuthority slug="industrial-supplies" />;
}
