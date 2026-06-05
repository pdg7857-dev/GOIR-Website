import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("merx");

export default function Page() {
  return <PlatformAuthority slug="merx" />;
}
