import { z } from 'zod';

const urlValidation = z.string().optional().refine(
  (v) => !v || /^https?:\/\/.+\..+/.test(v),
  'Enter a valid URL'
);

const optionalHttpsUrl = z.string().optional().refine(
  (v) => !v || /^https:\/\/.+\..+/.test(v),
  'Enter a valid https URL'
);

export const businessSchema = z.object({
  fullName: z.string().min(1),
  workEmail: z.string().email(),
  company: z.string().min(1),
  companyWebsite: urlValidation,
  role: z.string().min(1),
  roleOther: z.string().optional(),
  country: z.string().min(1),
  inquiryType: z.string().optional(),
  projectCategory: z.string().optional(),
  projectCategoryOther: z.string().optional(),
  industry: z.string().optional(),
  budget: z.string().optional(),
  targetDeadline: z.string().optional(),
  targetDeadlineOther: z.string().optional(),
  startDate: z.string().optional(),
  message: z.string().optional(),
  externalLinks: optionalHttpsUrl,
  ndaRequested: z.boolean().optional(),
  source: z.string().optional(),
  sourceOther: z.string().optional(),
  privacyPolicy: z.boolean().optional(),
  honeypot: z.string().optional(),
  attachedFile: z.object({
    name: z.string(),
    base64: z.string(),
  }).optional(),
});

export const freelancerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  department: z.array(z.string()).optional(),
  departmentOther: z.string().optional(),
  mainSoftware: z.string().optional(),
  yearsExperience: z.string().optional(),
  expectedRate: z.string().optional(),
  availability: z.string().optional(),
  reelLink: optionalHttpsUrl,
  reelPassword: z.string().optional(),
  websiteUrl: optionalHttpsUrl,
  otherLinks: optionalHttpsUrl,
  source: z.string().optional(),
  sourceOther: z.string().optional(),
  message: z.string().optional(),
  privacyPolicy: z.boolean().optional(),
  honeypot: z.string().optional(),
});

export type BusinessPayload = z.infer<typeof businessSchema>;
export type FreelancerPayload = z.infer<typeof freelancerSchema>;
