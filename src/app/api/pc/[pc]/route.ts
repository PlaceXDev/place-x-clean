export const runtime = "nodejs";

import type { NextRequest, RouteContext } from "next/server";
import { getPostcode } from "@/data/getPostcode";

export async function GET(
  _req: NextRequest,
  context: RouteContext<{ pc: string }>
) {
  const pc = decodeURIComponent(context.params.pc);

  try {
    const row = await getPostcode(pc);
    return Response.json({ ok: Boolean(row), row });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}
