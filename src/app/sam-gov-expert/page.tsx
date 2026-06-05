import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("sam-gov");

export default function Page() {
  return <PlatformAuthority slug="sam-gov" />;
}
