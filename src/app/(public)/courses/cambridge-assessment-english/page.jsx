import { CambridgeCourseDetailPage } from "@/src/features/pages/CourseDetailPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
export const metadata = metadataFor("cambridge");
export default async function Page() { return <CambridgeCourseDetailPage data={await getSiteData()} />; }
