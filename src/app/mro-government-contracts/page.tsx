import { IndustryAuthority, industryMetadata } from "@/components/site/industry-authority";

export const metadata = industryMetadata("mro");

export default function Page() {
  return <IndustryAuthority slug="mro" />;
}
