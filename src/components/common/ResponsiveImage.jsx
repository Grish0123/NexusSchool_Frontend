import Image from "next/image";

const OPTIMIZED_REMOTE_HOSTS = ["backend.nexus.edu.np", "api.nexus.edu.np"];

function canUseNextOptimizer(src) {
  if (typeof src !== "string") return false;
  if (src.startsWith("/")) return true;
  try {
    return OPTIMIZED_REMOTE_HOSTS.includes(new URL(src).hostname);
  } catch {
    return false;
  }
}

/** Uses Next optimization for local and approved CMS media without rejecting external CMS URLs. */
export function ResponsiveImage({ alt = "", sizes, src, ...props }) {
  return <Image alt={alt} sizes={sizes} src={src} unoptimized={!canUseNextOptimizer(src)} {...props} />;
}
