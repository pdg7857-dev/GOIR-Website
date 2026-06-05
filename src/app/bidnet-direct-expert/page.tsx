import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("bidnet-direct");

export default function Page() {
  return <PlatformAuthority slug="bidnet-direct" />;
}
