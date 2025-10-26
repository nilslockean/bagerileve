export function isProduction() {
  return import.meta.env.MODE === "production";
}
