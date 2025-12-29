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
  template,
}) {
  const now = new Date().toLocaleString();

  if (template) {
    return template
      .replace(/{{name}}/g, name || '')
      .replace(/{{email}}/g, email || '')
      .replace(/{{phone}}/g, phone || '-')
      .replace(/{{company}}/g, company || '-')
      .replace(/{{subject}}/g, subject || '')
      .replace(/{{message}}/g, message || '')
      .replace(/{{date}}/g, now);
  }

  return `
─────────────────
📧 New Website Inquiry! 📧
─────────────────

Date:    ${now}
From:    ${name}
Email:   ${email}
Phone:   ${phone || '-'}
Company: ${company || '-'}
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
 * @param {string} [params.template]
 * @returns {string}
 */
export function formatConfirmationEmail({ name, subject, template }) {
  const now = new Date().toLocaleString();

  if (template) {
    return template
      .replace(/{{name}}/g, name || '')
      .replace(/{{subject}}/g, subject || '')
      .replace(/{{date}}/g, now);
  }

  return `
─────────────────
✅ Star Electronic: Request Received!
─────────────────

Hello${name ? ` ${name}` : ''},

Thank you for contacting Star Electronic!
We have received your request${
    subject ? ` regarding "${subject}"` : ''
  } and our team is now processing it.

You will receive a reply as soon as possible. If you have any further questions, simply reply to this email.

Best regards,
The Star Electronic Team

Date received: ${now}
`;
}
