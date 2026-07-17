// ──────────────────────────────────────────────────────────────────────────
// EMAILJS CREDENTIALS
// Replace the placeholder values in .env.local with your actual credentials:
//   NEXT_PUBLIC_EMAILJS_SERVICE_ID  — from emailjs.com dashboard → Email Services
//   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID — from emailjs.com dashboard → Email Templates
//   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  — from emailjs.com dashboard → Account → API Keys
// ──────────────────────────────────────────────────────────────────────────

import emailjs from "@emailjs/browser";

export interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  course: string;
  timing: string;
  startDate: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

function getEmailJsConfig(templateId: string | undefined) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const values = [serviceId, templateId, publicKey];
  if (values.some((value) => !value || value.startsWith("your_"))) {
    throw new Error("Email delivery is not configured yet. Please add your EmailJS IDs to .env.local.");
  }
  return { serviceId: serviceId!, templateId: templateId!, publicKey: publicKey! };
}

export async function sendRegistration(formValues: FormValues): Promise<void> {
  const { serviceId, templateId, publicKey } = getEmailJsConfig(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
  await emailjs.send(serviceId, templateId, {
    full_name: formValues.fullName,
    phone: formValues.phone,
    email: formValues.email,
    course: formValues.course,
    timing: formValues.timing,
    start_date: formValues.startDate,
  }, publicKey);
}

export async function sendContactMessage(formValues: ContactFormValues): Promise<void> {
  const { serviceId, templateId, publicKey } = getEmailJsConfig(process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID);
  await emailjs.send(serviceId, templateId, {
    from_name: formValues.name,
    reply_to: formValues.email,
    phone: formValues.phone || "Not provided",
    course: formValues.course || "General enquiry",
    message: formValues.message,
  }, publicKey);
}
