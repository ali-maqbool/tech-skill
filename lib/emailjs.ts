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

export async function sendRegistration(formValues: FormValues): Promise<void> {
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        full_name: formValues.fullName,
        phone: formValues.phone,
        email: formValues.email,
        course: formValues.course,
        timing: formValues.timing,
        start_date: formValues.startDate,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );
  } catch (error) {
    throw error;
  }
}
