import { AboutPage } from "@/src/features/pages/AboutPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
export const metadata = metadataFor("about");
export default async function Page() { return <AboutPage data={await getSiteData()} />; }
