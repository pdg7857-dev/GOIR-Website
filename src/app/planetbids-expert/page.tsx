import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("planetbids");

export default function Page() {
  return <PlatformAuthority slug="planetbids" />;
}
