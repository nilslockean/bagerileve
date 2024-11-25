export interface ISanityClient {
  fetch: (query: string) => Promise<unknown>;
}
