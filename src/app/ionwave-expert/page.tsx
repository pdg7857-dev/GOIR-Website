import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("ionwave");

export default function Page() {
  return <PlatformAuthority slug="ionwave" />;
}
