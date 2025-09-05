export const runtime = "nodejs";

import type { NextRequest } from "next/server";
import { getPostcode } from "@/data/getPostcode";

type Params = { pc: string };
type Ctx = { params: Params } | { params: Promise<Params> };

/** Await a value that might already be a Promise */
function toAwait<T>(v: T | Promise<T>): Promise<T> {
  return Promise.resolve(v);
}

/** Safe error -> message */
function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  // Supports both: { params: { pc } } and { params: Promise<{ pc }> }
  const { pc } = await toAwait(ctx.params);
  const decodedPc = decodeURIComponent(pc);

  try {
    const row = await getPostcode(decodedPc);
    return Response.json({ ok: Boolean(row), row });
  } catch (e) {
    return Response.json({ ok: false, error: errorMessage(e) }, { status: 500 });
  }
}
