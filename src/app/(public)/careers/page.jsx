import { CardsPage } from "@/src/features/pages/CardsPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
import { careerItems, pageHero } from "@/src/utils/content.js";
import { careerImages, siteImages } from "@/src/data/siteImages.js";
export const metadata = metadataFor("careers");
export default async function Page() { const data = await getSiteData(); return <CardsPage data={data} hero={pageHero(data, "careers", { careerPhotos: data.careerPhotos?.length ? data.careerPhotos : careerImages, copy: "Join a school culture built around discipline, care, excellence, and student growth.", eyebrow: "Work With Nexus", image_url: siteImages.speaker, title: "Careers" })} items={careerItems(data)} kind="career" />; }
