/** @format */

export async function POST(req) {
  const body = await req.json();
  const { name, email, phone, company, subject, message } = body || {};
  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  const to = process.env.CONTACT_TO || "info@star-electronic.example";

  try {
    // Lazy import to avoid bundling when unused
    let sent = false;
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      const nodemailer = (await import("nodemailer")).default;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `Star Electronic Website <no-reply@${new URL(req.url).host}>`,
        to,
        subject: `[Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${
          phone || ""
        }\nCompany: ${company || ""}\n\n${message}`,
      });
      sent = true;
    }
    if (!sent) {
      console.info("Contact form (dev mode):", {
        name,
        email,
        phone,
        company,
        subject,
        message,
        to,
      });
    }
    return Response.json({ ok: true });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
