import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("gsa-ebuy");

export default function Page() {
  return <PlatformAuthority slug="gsa-ebuy" />;
}
