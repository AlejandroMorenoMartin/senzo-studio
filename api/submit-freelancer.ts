import type { VercelRequest, VercelResponse } from '@vercel/node';
import { freelancerSchema } from './_lib/schemas.js';
import { saveFreelancerLead } from './_lib/airtable.js';
import { sendFreelancerNotification } from './_lib/resend.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = freelancerSchema.safeParse(req.body);
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
      saveFreelancerLead(data),
      sendFreelancerNotification(data),
    ]);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[submit-freelancer]', err);
    return res.status(500).json({ error: 'Submission failed. Please try again.' });
  }
}
