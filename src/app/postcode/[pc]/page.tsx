// src/app/postcode/[pc]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostcode } from "@/data/getPostcode";

type RouteParams = { pc: string };

// If you use dynamic metadata, keep this signature exactly:
export async function generateMetadata(
  { params }: { params: RouteParams }
): Promise<Metadata> {
  const pc = decodeURIComponent(params.pc);
  return {
    title: `Postcode ${pc} | Place X`,
    description: `Insights for postcode ${pc}.`,
  };
}

// Main page component — keep params as a plain object
export default async function PostcodePage(
  { params }: { params: RouteParams }
) {
  const pc = decodeURIComponent(params.pc);

  const row = await getPostcode(pc);
  if (!row) notFound();

  // --- Render your real UI below ---
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Postcode: {row.pc_display}</h1>
      {/* TODO: render your metrics from `row` */}
    </main>
  );
}
