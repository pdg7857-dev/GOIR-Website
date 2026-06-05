import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("canadabuys");

export default function Page() {
  return <PlatformAuthority slug="canadabuys" />;
}
