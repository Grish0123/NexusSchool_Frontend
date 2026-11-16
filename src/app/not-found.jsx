import Link from "next/link";

export default function NotFound() {
  return <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}><div><h1>Page not found</h1><p>The page you requested is not available.</p><Link href="/">Return to Nexus International School</Link></div></main>;
}
