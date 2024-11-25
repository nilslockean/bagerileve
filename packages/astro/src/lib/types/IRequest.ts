export interface IRequest {
  method: string;
  url: string | URL;
  headers?: Headers;
  body?: BodyInit | null;
}
