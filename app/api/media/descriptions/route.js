/** @format */
import { requireKey } from "../../auth/_utils";
import { updateDescriptions } from "../../../../lib/storage";

export async function POST(req) {
  await requireKey(req);
  const { folder, descriptions } = await req.json();
  if (!folder || !descriptions || typeof descriptions !== "object") {
    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      status: 400,
    });
  }
  await updateDescriptions(folder, descriptions);
  return Response.json({ ok: true });
}
