import type { VercelRequest, VercelResponse } from '@vercel/node';
import { businessSchema } from './_lib/schemas.js';
import { saveBusinessLead } from './_lib/airtable.js';
import { sendBusinessNotification } from './_lib/resend.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = businessSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid form data', issues: parsed.error.issues });
  }

  const data = parsed.data;

  // Honeypot — silent drop
  if (data.honeypot) {
    return res.status(200).json({ ok: true });
  }

  try {
    await Promise.all([
      saveBusinessLead(data),
      sendBusinessNotification(data),
    ]);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[submit-business]', err);
    return res.status(500).json({ error: 'Submission failed. Please try again.' });
  }
}
