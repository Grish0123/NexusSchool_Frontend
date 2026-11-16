import { NoticesPage } from "@/src/features/pages/NoticesPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
import { notices } from "@/src/utils/content.js";
export const metadata = metadataFor("notices");
export default async function Page() { const data = await getSiteData(); return <NoticesPage data={data} items={notices(data)} />; }
