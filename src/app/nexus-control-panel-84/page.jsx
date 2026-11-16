"use client";

import { AdminPage } from "@/src/features/pages/AdminPage.jsx";
import { useSiteData } from "@/src/hooks/useSiteData.js";

export default function AdminRoute() {
  const { data, loading } = useSiteData();
  if (loading || !data) return <main aria-busy="true">Loading Nexus CMS…</main>;
  return <AdminPage data={data} />;
}
