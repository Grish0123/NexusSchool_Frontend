import { SiteShell } from "../../components/layout/SiteShell.jsx";
import { getSiteData } from "../../lib/site-data.js";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }) {
  return <SiteShell data={await getSiteData()}>{children}</SiteShell>;
}
