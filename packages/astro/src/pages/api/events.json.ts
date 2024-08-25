export const prerender = false;

export async function GET() {
  return new Response(
    JSON.stringify(
      {
        now: Date.now(),
        meta: import.meta.env.FIENTA_API_KEY || "",
        process: process.env.FIENTA_API_KEY || "",
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
