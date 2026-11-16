import { CardsPage } from "@/src/features/pages/CardsPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
import { clubs, pageHero } from "@/src/utils/content.js";
import { siteImages } from "@/src/data/siteImages.js";
export const metadata = metadataFor("studentLife");
export default async function Page() { const data = await getSiteData(); return <CardsPage data={data} hero={pageHero(data, "student-life", { copy: "A quick gateway to real activities, gallery memories, clubs, and student confidence at Nexus.", eyebrow: "Life at Nexus", image_url: siteImages.stage, title: "Student Life" })} items={clubs(data)} kind="club" />; }
