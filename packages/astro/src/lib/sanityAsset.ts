export function sanityAsset(
  filename: string,
  projectId: string,
  dataset: string
): string {
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${filename}`;
}
