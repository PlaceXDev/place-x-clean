import "server-only";
import { supabase } from "@/lib/supabase";
import { normalizePostcode, toCompact } from "@/lib/postcode";

export type DbRow = {
  pc_norm: string;
  postcode?: string | null;               // support either column name
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
  // allow other columns (e.g. id) without strict typing
  [key: string]: unknown;
};

export type PostcodeMetrics =
  // everything from the row
  Omit<DbRow, "postcode" | "pc_display"> & {
    // ensure we always return a display string
    pc_display: string;
  };

/** Omit keys from a record without introducing unused variables**
