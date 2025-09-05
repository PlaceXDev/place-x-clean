export const runtime = "nodejs";
import { getPostcode } from "@/data/getPostcode";

export async function GET(
  _req: Request,
  { params }: { params: { pc: string } }
) {
  try {
    const row = await getPostcode(params.pc);
    return Response.json({ ok: !!row, row });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}
