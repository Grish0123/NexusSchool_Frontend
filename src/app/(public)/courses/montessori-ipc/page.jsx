import { CourseDetailPage } from "@/src/features/pages/CourseDetailPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
export const metadata = metadataFor("montessori");
export default async function Page() { return <CourseDetailPage data={await getSiteData()} />; }
