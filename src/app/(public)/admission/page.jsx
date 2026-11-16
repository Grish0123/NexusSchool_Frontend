import { AdmissionsPage } from "@/src/features/pages/AdmissionsPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
export const metadata = metadataFor("admission");
export default async function Page() { return <AdmissionsPage data={await getSiteData()} />; }
