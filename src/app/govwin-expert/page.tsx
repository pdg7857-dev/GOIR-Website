import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("govwin");

export default function Page() {
  return <PlatformAuthority slug="govwin" />;
}
