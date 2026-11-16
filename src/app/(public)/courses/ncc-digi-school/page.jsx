import { NccDigiCourseDetailPage } from "@/src/features/pages/CourseDetailPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
export const metadata = metadataFor("digi");
export default async function Page() { return <NccDigiCourseDetailPage data={await getSiteData()} />; }
