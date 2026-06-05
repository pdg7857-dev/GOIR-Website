import { IndustryAuthority, industryMetadata } from "@/components/site/industry-authority";

export const metadata = industryMetadata("facilities-maintenance");

export default function Page() {
  return <IndustryAuthority slug="facilities-maintenance" />;
}
