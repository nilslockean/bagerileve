import type { APIContext } from "astro";

export const prerender = false;

export async function GET(context: APIContext) {
  return new Response(
    JSON.stringify(
      {
        now: Date.now(),
        meta: import.meta.env.FIENTA_API_KEY || "",
        process: process.env.FIENTA_API_KEY || "",
        locals: context.locals.runtime.env.FIENTA_API_KEY || "",
      },
      null,
      2
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
