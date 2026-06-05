import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("opengov");

export default function Page() {
  return <PlatformAuthority slug="opengov" />;
}
