import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("jaggaer");

export default function Page() {
  return <PlatformAuthority slug="jaggaer" />;
}
