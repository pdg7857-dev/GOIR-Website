import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("usaspending");

export default function Page() {
  return <PlatformAuthority slug="usaspending" />;
}
