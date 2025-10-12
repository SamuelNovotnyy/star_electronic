/** @format */
import { requireKey } from "../../auth/_utils";
import { uploadFiles } from "../../../../lib/storage";

export async function POST(req) {
  await requireKey(req);
  const form = await req.formData();
  const folder = form.get("folder");
  const files = form.getAll("files");
  if (!folder || !files?.length) {
    return new Response(JSON.stringify({ error: "Missing folder/files" }), {
      status: 400,
    });
  }
  await uploadFiles(folder, files);
  return Response.json({ ok: true });
}
