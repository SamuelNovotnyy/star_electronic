/** @format */
"use client";

import { useMemo, useState } from "react";

export default function ContactForm({ messages }) {
  const t = useMemo(() => {
    return (key, fallback) =>
      key
        .split(".")
        .reduce(
          (o, k) => (o && o[k] !== undefined ? o[k] : undefined),
          messages || {}
        ) ??
      fallback ??
      key;
  }, [messages]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus({ ok: true, msg: "Message sent. We'll get back shortly." });
      e.currentTarget.reset();
    } catch (err) {
      setStatus({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Name</label>
          <input name="name" className="input" required />
        </div>
        <div>
          <label className="label">Company</label>
          <input name="company" className="input" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Email</label>
          <input type="email" name="email" className="input" required />
        </div>
        <div>
          <label className="label">Phone</label>
          <input type="tel" name="phone" className="input" />
        </div>
      </div>
      <div>
        <label className="label">Subject</label>
        <input name="subject" className="input" required />
      </div>
      <div>
        <label className="label">Message</label>
        <textarea name="message" className="textarea" rows={6} required />
      </div>
      <button className="btn btn-primary" disabled={loading}>
        {loading
          ? t("contact.sending", "Sending…")
          : t("contact.send", "Send message")}
      </button>
      {status && (
        <p className={status.ok ? "text-green-600" : "text-red-600"}>
          {status.msg}
        </p>
      )}
    </form>
  );
}
