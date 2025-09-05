export const runtime = "nodejs";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { count, error } = await supabase
    .from("postcode_metrics")
    .select("*", { head: true, count: "exact" });

  return Response.json({
    ok: !error,
    count: count ?? null,
    error: error?.message ?? null,
  }, { status: error ? 500 : 200 });
}
