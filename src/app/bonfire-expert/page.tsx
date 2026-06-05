import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("bonfire");

export default function Page() {
  return <PlatformAuthority slug="bonfire" />;
}
