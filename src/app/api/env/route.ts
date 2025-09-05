export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    anon: !!process.env.SUPABASE_ANON_KEY,
  });
}
