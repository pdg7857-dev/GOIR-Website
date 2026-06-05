import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("periscope");

export default function Page() {
  return <PlatformAuthority slug="periscope" />;
}
