import { IndustryAuthority, industryMetadata } from "@/components/site/industry-authority";

export const metadata = industryMetadata("construction");

export default function Page() {
  return <IndustryAuthority slug="construction" />;
}
