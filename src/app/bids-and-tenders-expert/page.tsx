import { PlatformAuthority, platformMetadata } from "@/components/site/platform-authority";

export const metadata = platformMetadata("bids-and-tenders");

export default function Page() {
  return <PlatformAuthority slug="bids-and-tenders" />;
}
