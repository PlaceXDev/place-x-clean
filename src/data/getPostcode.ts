import "server-only";
import { supabase } from "@/lib/supabase";
import { normalizePostcode, toCompact } from "@/lib/postcode";

export type DbRow = {
  pc_norm: string;
  postcode?: string | null;
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
  [key: string]: unknown;
};

export type PostcodeMetrics = Omit<DbRow, "postcode" | "pc_display"> & {
  pc_display: string;
};

function omitKeys<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Omit<T, K> {
  const skip = new Set<string>(keys as readonly string[]);
  const entries = Object.entries(obj).filter(([k]) => !skip.has(k));
  return Object.fromEntries(entries) as Omit<T, K>;
}

export async function getPostcode(rawPc: string): Promise<PostcodeMetrics | null> {
  const raw = decodeURIComponent(rawPc || "");
  const pretty = normalizePostcode(raw);
  if (!pretty) return null;

  const pc_norm = toCompact(pretty);

  const { data, error } = await supabase
    .from<DbRow>("postcode_metrics")
    .select("*")
    .eq("pc_norm", pc_norm)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const pc_display = (data.postcode ?? data.pc_display ?? pretty) as string;

  const rest = omitKeys(data as Record<string, unknown>, [
    "pc_norm",
    "pc_display",
    "postcode",
  ] as const);

  return {
    pc_norm,
    pc_display,
    ...(rest as Omit<DbRow, "pc_norm" | "pc_display" | "postcode">),
  };
}
