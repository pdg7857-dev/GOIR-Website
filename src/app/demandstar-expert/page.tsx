import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("demandstar");

export default function Page() {
  return <PlatformAuthority slug="demandstar" />;
}
