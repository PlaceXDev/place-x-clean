export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getPostcode } from "@/data/getPostcode";

const LABELS: Record<string, string> = {
  liveability_score: "Liveability Score",
  crime: "Crime",
  education: "Education",
  open_space: "Open Space",
  income: "Income",
  average_house_price: "Average House Price",
  house_price_growth: "House Price Growth",
  average_house_size: "Average House Size",
  typical_house_type: "Typical House Type",
  future_housing_price_growth: "Future Housing Price Growth",
  future_prospects_score: "Future Prospects Score",
  population_growth: "Population Growth",
};

type Row = NonNullable<Awaited<ReturnType<typeof getPostcode>>>;

export default async function PostcodePage(
  { params }: { params: { pc: string } }
) {
  const decoded = decodeURIComponent(params.pc || "");
  const row = await getPostcode(decoded);
  if (!row) notFound();

  const hidden: Array<keyof Row> = ["pc_norm", "pc_display", "is_published", "updated_at"];
  const fields = (Object.keys(row) as Array<keyof Row>).filter((k) => !hidden.includes(k));

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">{row.pc_display}</h1>
        <p className="text-sm opacity-70">
          Data timestamp: {new Date(row.updated_at).toLocaleString()}
        </p>
      </header>

      <div className="grid gap-3">
        {fields.map((k) => {
          const label = LABELS[String(k)] ?? String(k);
          const value = row[k];
          return (
            <div key={String(k)} className="flex justify-between border rounded-lg px-3 py-2">
              <span className="opacity-70">{label}</span>
              <span>{value == null ? "—" : String(value)}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
