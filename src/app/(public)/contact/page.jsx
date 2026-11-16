import { ContactPage } from "@/src/features/pages/ContactPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
export const metadata = metadataFor("contact");
export default async function Page() { return <ContactPage data={await getSiteData()} />; }
