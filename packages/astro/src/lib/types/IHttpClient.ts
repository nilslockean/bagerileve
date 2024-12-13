import type { GetOptions } from "./GetOptions";
import type { IRequest } from "./IRequest";

export interface IHttpClient {
  get(url: string | URL, options?: GetOptions): Promise<unknown>;
  request(request: Readonly<IRequest>): Promise<unknown>;
}
