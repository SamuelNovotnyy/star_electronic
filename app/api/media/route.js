/** @format */
import { listMedia } from "../../../lib/storage";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder") || "star_electronic_gallery";
  try {
    const items = await listMedia(folder);
    return Response.json({ items });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
