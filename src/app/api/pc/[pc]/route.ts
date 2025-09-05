export const runtime = "nodejs";
import type { NextRequest } from "next/server";
import { getPostcode } from "@/data/getPostcode";

export async function GET(
  _req: NextRequest,
  ctx: { params: { pc: string } } | { params: Promise<{ pc: string }> } // accept both
) {
  // support both shapes transparently
  const p = (ctx.params as any);
  const { pc } = (typeof p?.then === "function") ? await p : p;

  try {
    const row = await getPostcode(pc);
    return Response.json({ ok: !!row, row });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}
