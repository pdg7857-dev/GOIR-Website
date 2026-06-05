import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("sap-ariba");

export default function Page() {
  return <PlatformAuthority slug="sap-ariba" />;
}
