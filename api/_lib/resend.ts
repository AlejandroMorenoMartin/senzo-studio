import { Resend } from 'resend';
import type { BusinessPayload, FreelancerPayload } from './schemas.js';

function getClient(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return new Resend(key);
}

function getFrom(): string {
  return process.env.RESEND_FROM ?? 'info@senzostudio.com';
}

function getTo(): string {
  return process.env.RESEND_TO ?? 'info@senzostudio.com';
}

function esc(s: string | undefined): string | undefined {
  return s?.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function row(label: string, value: string | undefined): string {
  if (!value) return '';
  return `<tr><td style="padding:6px 12px;color:#888;font-size:13px;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#eee;font-size:13px">${esc(value)}</td></tr>`;
}

export async function sendBusinessNotification(data: BusinessPayload): Promise<void> {
  const resend = getClient();
  const subject = `[Business] ${data.fullName} — ${data.company}`;

  const html = `
    <div style="background:#0a0a0a;padding:32px;font-family:monospace">
      <p style="color:#666;font-size:12px;margin:0 0 16px">New business inquiry — Senzo Studio</p>
      <table style="border-collapse:collapse;width:100%">
        ${row('Name', data.fullName)}
        ${row('Email', data.workEmail)}
        ${row('Company', data.company)}
        ${row('Website', data.companyWebsite)}
        ${row('Role', data.role === 'Other' ? data.roleOther : data.role)}
        ${row('Country', data.country)}
        ${row('Inquiry', data.inquiryType)}
        ${row('Category', data.projectCategory === 'Other' ? data.projectCategoryOther : data.projectCategory)}
        ${row('Budget', data.budget)}
        ${row('Start date', data.startDate)}
        ${row('Source', data.source === 'Other' ? data.sourceOther : data.source)}
        ${row('NDA', data.ndaRequested ? 'Requested' : undefined)}
        ${row('Attached file', data.attachedFile?.name)}
      </table>
      ${data.message ? `<p style="color:#ccc;font-size:14px;margin:24px 0 0;padding:16px;background:#111;border-left:2px solid #333">${esc(data.message)}</p>` : ''}
    </div>
  `;

  const { error } = await resend.emails.send({
    from: getFrom(),
    to: getTo(),
    subject,
    html,
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
}

export async function sendFreelancerNotification(data: FreelancerPayload): Promise<void> {
  const resend = getClient();
  const subject = `[Freelancer] ${data.firstName} ${data.lastName}`;

  const html = `
    <div style="background:#0a0a0a;padding:32px;font-family:monospace">
      <p style="color:#666;font-size:12px;margin:0 0 16px">New freelancer application — Senzo Studio</p>
      <table style="border-collapse:collapse;width:100%">
        ${row('Name', `${data.firstName} ${data.lastName}`)}
        ${row('Email', data.email)}
        ${row('Country', data.country)}
        ${row('Departments', (data.department ?? []).join(', '))}
        ${row('Software', data.mainSoftware)}
        ${row('Experience', data.yearsExperience ? `${data.yearsExperience} years` : undefined)}
        ${row('Rate', data.expectedRate)}
        ${row('Availability', data.availability)}
        ${row('Reel', data.reelLink)}
        ${row('Website', data.websiteUrl)}
        ${row('Source', data.source === 'Other' ? data.sourceOther : data.source)}
      </table>
      ${data.message ? `<p style="color:#ccc;font-size:14px;margin:24px 0 0;padding:16px;background:#111;border-left:2px solid #333">${esc(data.message)}</p>` : ''}
    </div>
  `;

  const { error } = await resend.emails.send({
    from: getFrom(),
    to: getTo(),
    subject,
    html,
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
}
