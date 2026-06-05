import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("biddingo");

export default function Page() {
  return <PlatformAuthority slug="biddingo" />;
}
