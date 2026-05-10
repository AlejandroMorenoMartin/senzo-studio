import type { BusinessPayload, FreelancerPayload } from './schemas.js';

const BASE_URL = 'https://api.airtable.com/v0';

function getHeaders(): Record<string, string> {
  const key = process.env.AIRTABLE_API_KEY;
  if (!key) throw new Error('AIRTABLE_API_KEY is not set');
  return {
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

function getBaseId(): string {
  const id = process.env.AIRTABLE_BASE_ID;
  if (!id) throw new Error('AIRTABLE_BASE_ID is not set');
  return id;
}

export async function saveBusinessLead(data: BusinessPayload): Promise<void> {
  const fields: Record<string, unknown> = {
    fullName: data.fullName,
    workEmail: data.workEmail,
    company: data.company,
    companyWebsite: data.companyWebsite ?? '',
    role: data.role === 'Other' && data.roleOther ? data.roleOther : data.role,
    country: data.country,
    inquiryType: data.inquiryType ?? '',
    projectCategory: data.projectCategory === 'Other' && data.projectCategoryOther
      ? data.projectCategoryOther
      : (data.projectCategory ?? ''),
    industry: data.industry ?? '',
    budget: data.budget ?? '',
    targetDeadline: data.targetDeadline === 'Other' && data.targetDeadlineOther
      ? data.targetDeadlineOther
      : (data.targetDeadline ?? ''),
    startDate: data.startDate ?? '',
    message: data.message ?? '',
    externalLinks: data.externalLinks ?? '',
    ndaRequested: data.ndaRequested ?? false,
    source: data.source === 'Other' && data.sourceOther ? data.sourceOther : (data.source ?? ''),
    attachedFile: data.attachedFile?.name ?? '',
    submitted_at: new Date().toISOString(),
    language: '',
  };

  const res = await fetch(`${BASE_URL}/${getBaseId()}/Business%20Leads`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable error ${res.status}: ${body}`);
  }
}

export async function saveFreelancerLead(data: FreelancerPayload): Promise<void> {
  const fields: Record<string, unknown> = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    country: data.country,
    department: (data.department ?? [])
      .map((d) => d === 'Other' && data.departmentOther ? data.departmentOther : d)
      .join(', '),
    mainSoftware: data.mainSoftware ?? '',
    yearsExperience: data.yearsExperience ?? '',
    expectedRate: data.expectedRate ?? '',
    availability: data.availability ?? '',
    reelLink: data.reelLink ?? '',
    reelPassword: data.reelPassword ?? '',
    websiteUrl: data.websiteUrl ?? '',
    otherLinks: data.otherLinks ?? '',
    source: data.source === 'Other' && data.sourceOther ? data.sourceOther : (data.source ?? ''),
    message: data.message ?? '',
    submitted_at: new Date().toISOString(),
    language: '',
  };

  const res = await fetch(`${BASE_URL}/${getBaseId()}/Freelancer%20Leads`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable error ${res.status}: ${body}`);
  }
}
