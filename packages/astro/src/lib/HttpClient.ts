import type { GetOptions } from "./types/GetOptions";
import type { IHttpClient } from "./types/IHttpClient";
import type { IRequest } from "./types/IRequest";

export class HttpClient implements IHttpClient {
  public async get(url: string | URL, options?: GetOptions): Promise<unknown> {
    const request: IRequest = {
      method: "GET",
      url,
      headers: options?.headers,
    };

    return await this.request(request);
  }

  public async request(request: Readonly<IRequest>): Promise<unknown> {
    request = {
      ...request,
      headers: request.headers,
    };

    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const json = await response.json();

    return json;
  }
}
