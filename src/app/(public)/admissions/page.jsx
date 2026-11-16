import { permanentRedirect } from "next/navigation";

// Both legacy routes rendered the identical AdmissionsPage component and data.
// Keep the indexed /admission URL canonical while preserving old inbound links.
export default function Page() { permanentRedirect("/admission"); }
