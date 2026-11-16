import { GalleryPage } from "@/src/features/pages/GalleryPage.jsx";
import { getSiteData } from "@/src/lib/site-data.js";
import { metadataFor } from "@/src/lib/page-metadata.js";
import { galleryAlbums } from "@/src/utils/content.js";
export const metadata = metadataFor("gallery");
export default async function Page() { const data = await getSiteData(); return <GalleryPage data={data} items={galleryAlbums(data)} />; }
