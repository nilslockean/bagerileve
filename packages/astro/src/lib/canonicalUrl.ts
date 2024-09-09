export function getCanonicalUrl(siteUrl: string, path: string) {
  const url = new URL(siteUrl);

  // Remove trailing slash from index page
  if (path === "/") {
    return url.toString().replace(/\/$/, "");
  }

  url.pathname = path;

  // Enforce trailing slash on all other routes
  return url.toString().replace(/\/$/, "") + "/";
}
