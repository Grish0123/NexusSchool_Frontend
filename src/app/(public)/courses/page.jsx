import { CardsPage } from "@/src/features/pages/CardsPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
import { courses, pageHero } from "@/src/utils/content.js";
import { siteImages } from "@/src/data/siteImages.js";
export const metadata = metadataFor("courses");
export default async function Page() { const data = await getSiteData(); return <CardsPage data={data} hero={pageHero(data, "courses", { copy: "Explore each Nexus program with learning details, student fit, and next steps.", eyebrow: "Academic Programs", image_url: siteImages.audience, title: "Courses" })} items={courses(data)} kind="course" />; }
