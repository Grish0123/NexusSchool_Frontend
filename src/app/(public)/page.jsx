import { HomePage } from "@/src/features/pages/HomePage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";

export const metadata = metadataFor("home");
export default async function Page() { return <HomePage data={await getSiteData()} />; }
