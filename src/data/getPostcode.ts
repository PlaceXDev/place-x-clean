import "server-only";
import { supabase } from "@/lib/supabase";
import { normalizePostcode, toCompact } from "@/lib/postcode";

export type DbRow = {
  pc_norm: string;
  postcode?: string | null;      // support either column name
  pc_display?: string | null;
  liveability_score: number | null;
  crime: number | null;
  education: number | null;
  open_space: number | null;
  income: number | null;
  average_house_price: number | null;
  house_price_growth: number | null;
  average_house_size: number | null;
  typical_house_type: string | null;
  future_housing_price_growth: number | null;
  future_prospects_score: number | null;
  population_growth: number | null;
  is_published: boolean;
  updated_at: string;
};

export async function getPostcode(rawPc: string) {
  const raw = decodeURIComponent(rawPc || "");
  const pretty = normalizePostcode(raw);
  if (!pretty) return null;

  const pc_norm = toCompact(pretty);

  const { data, error } = await supabase
    .from("postcode_metrics")
    .select("*")
    .eq("pc_norm", pc_norm)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("[getPostcode] Supabase error:", error.message);
    throw error;
  }
  if (!data) {
    console.warn("[getPostcode] No row for", pc_norm);
    return null;
  }

  const row = data as DbRow;
  const pc_display = row.postcode ?? row.pc_display ?? pretty;

  return { pc_norm, pc_display, ...row };
}
