/** @format */
"use client";

import { useMemo, useState, useRef } from "react";

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
  const formRef = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = new FormData(formRef.current);
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
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      setStatus({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Contact Info Section */}
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
          <p className="text-muted-foreground">
            We'd love to hear from you. Please fill out this form or shoot us an email.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <i className="fas fa-map-marker-alt text-lg"></i>
            </div>
            <div>
              <h4 className="font-semibold">Our Office</h4>
              <p className="text-muted-foreground">123 Star Street, Tech City, TC 90210</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <i className="fas fa-envelope text-lg"></i>
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-muted-foreground">info@star-electronic.example</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <i className="fas fa-phone text-lg"></i>
            </div>
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="card bg-card p-8 shadow-lg">
        <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="label">Name</label>
              <input name="name" className="input w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20" required placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="label">Company</label>
              <input name="company" className="input w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20" placeholder="Star Inc." />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="label">Email</label>
              <input type="email" name="email" className="input w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20" required placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="label">Phone</label>
              <input type="tel" name="phone" className="input w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20" placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="label">Subject</label>
            <input name="subject" className="input w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20" required placeholder="How can we help?" />
          </div>

          <div className="space-y-2">
            <label className="label">Message</label>
            <textarea name="message" className="textarea w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20 min-h-[150px]" required placeholder="Tell us about your project..." />
          </div>

          <button className="btn btn-primary w-full py-3 text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200" disabled={loading}>
            {loading
              ? t("contact.sending", "Sending…")
              : t("contact.send", "Send Message")}
          </button>

          {status && (
            <div className={`p-4 rounded-lg ${status.ok ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              <p className="flex items-center gap-2">
                <i className={`fas ${status.ok ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
                {status.msg}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
