export const runtime = "nodejs";

import type { NextRequest } from "next/server";
import { getPostcode } from "@/data/getPostcode";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ pc: string }> } // ← Promise form for typed routes
) {
  try {
    const { pc } = await params;
    const row = await getPostcode(pc);
    return Response.json({ ok: !!row, row });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}
