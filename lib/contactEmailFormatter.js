/**
 * Formats the contact form email body for Star Electronic.
 *
 * @format
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} [params.phone]
 * @param {string} [params.company]
 * @param {string} params.subject
 * @param {string} params.message
 * @returns {string}
 */

export function formatContactEmail({
  name,
  email,
  phone,
  company,
  subject,
  message,
}) {
  const now = new Date().toLocaleString();
  return `
─────────────────
📧 New Website Inquiry! 📧
─────────────────

Date:    ${now}
From:    ${name}
Email:   ${email}
Phone:   ${phone || "-"}
Company: ${company || "-"}
Subject: ${subject}

─────────────────
Message:
─────────────────
${message}
`;
}

/**
 * Formats the confirmation email sent to the user.
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.subject
 * @returns {string}
 */
export function formatConfirmationEmail({ name, subject }) {
  const now = new Date().toLocaleString();
  return `
─────────────────
✅ Star Electronic: Request Received!
─────────────────

Hello${name ? ` ${name}` : ""},

Thank you for contacting Star Electronic!
We have received your request${
    subject ? ` regarding "${subject}"` : ""
  } and our team is now processing it.

You will receive a reply as soon as possible. If you have any further questions, simply reply to this email.

Best regards,
The Star Electronic Team

Date received: ${now}
`;
}
