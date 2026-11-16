import { CardsPage } from "@/src/features/pages/CardsPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
import { clubs, pageHero } from "@/src/utils/content.js";
import { siteImages } from "@/src/data/siteImages.js";
export const metadata = metadataFor("clubs");
export default async function Page() { const data = await getSiteData(); return <CardsPage data={data} hero={pageHero(data, "clubs", { copy: "Student activities designed for creativity, leadership, teamwork, confidence, and personal growth.", eyebrow: "Student Life", image_url: siteImages.stage, title: "Clubs" })} items={clubs(data)} kind="club" />; }
