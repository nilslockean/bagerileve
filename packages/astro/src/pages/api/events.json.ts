export async function GET() {
  return new Response(JSON.stringify({ now: Date.now() }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
