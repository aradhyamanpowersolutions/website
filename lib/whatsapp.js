import { site } from './site';

/**
 * Builds a wa.me click-to-chat link with the message pre-filled.
 *
 * Deliberately a deep link rather than the WhatsApp Business Cloud API: no Meta
 * business verification, no per-conversation cost, and it works the moment the
 * site is deployed. The trade-off is that wa.me cannot carry a file, which is
 * why job applications still go by email — a résumé PDF has to be an attachment.
 */
export function whatsappLink(message) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Enquiry from the contact form, with whatever the visitor has filled in. */
export function staffEnquiryMessage({ name, company, phone, message } = {}) {
  const lines = ['Hi Aradhya Manpower, I need staff.'];
  if (name?.trim()) lines.push(`Name: ${name.trim()}`);
  if (company?.trim()) lines.push(`Company: ${company.trim()}`);
  if (phone?.trim()) lines.push(`Phone: ${phone.trim()}`);
  if (message?.trim()) lines.push(`Requirement: ${message.trim()}`);
  return lines.join('\n');
}

export const generalEnquiryMessage = 'Hi Aradhya Manpower, I would like to enquire about staffing.';

export const jobEnquiryMessage =
  'Hi Aradhya Manpower, I have a question about applying for a job.';

/** Pre-filled enquiry for a specific role page. */
export const roleEnquiryMessage = (role) =>
  `Hi Aradhya Manpower, I need ${role.toLowerCase()} at my plant. Could you share details?`;
