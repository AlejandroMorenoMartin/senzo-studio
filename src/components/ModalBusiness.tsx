import { useEffect, useRef, useState } from 'react';
import { useForm, Controller, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import BtnIcon from './BtnIcon';
import Btn from './Btn';
import FormField from './form/FormField';
import InputText from './form/InputText';
import InputSelect from './form/InputSelect';
import InputTextarea from './form/InputTextarea';
import InputCheckbox from './form/InputCheckbox';
import FormStepper from './form/FormStepper';
import { COUNTRY_OPTIONS } from '../data/countries';

interface ModalBusinessProps {
  isOpen: boolean;
  onClose: () => void;
  onPrivacyClick: () => void;
}

const STEPS = ['Contact Information', 'Nature of inquiry', 'Project Specifications', 'Message & Attachments'];

const ROLE_OPTIONS = [
  { value: 'Producer', label: 'Producer' },
  { value: 'Director', label: 'Director' },
  { value: 'VFX Supervisor', label: 'VFX Supervisor' },
  { value: 'Art Director', label: 'Art Director' },
  { value: 'Marketing Manager', label: 'Marketing Manager' },
  { value: 'Brand Manager', label: 'Brand Manager' },
  { value: 'Agency', label: 'Agency' },
  { value: 'Representative', label: 'Representative' },
  { value: 'Studio', label: 'Studio' },
  { value: 'Other', label: 'Other' },
];


const CATEGORY_OPTIONS = [
  { value: 'Feature Film', label: 'Feature Film' },
  { value: 'TV Series', label: 'TV Series' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Music Video', label: 'Music Video' },
  { value: 'Animation', label: 'Animation' },
  { value: 'Game Cinematic', label: 'Game Cinematic' },
  { value: 'Other', label: 'Other' },
];

const BUDGET_OPTIONS = [
  { value: '€0 – €10K', label: '€0 – €10K' },
  { value: '€10K – €30K', label: '€10K – €30K' },
  { value: '€30K – €50K', label: '€30K – €50K' },
  { value: 'Over €50K', label: 'Over €50K' },
];


const SOURCE_OPTIONS = [
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Vimeo', label: 'Vimeo' },
  { value: 'Clutch', label: 'Clutch' },
  { value: 'Behance', label: 'Behance' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Industry Friend', label: 'Industry Friend' },
  { value: 'Other', label: 'Other' },
];

const DEADLINE_OPTIONS = [
  { value: 'ASAP', label: 'ASAP' },
  { value: '1 month', label: '1 month' },
  { value: '2-3 months', label: '2-3 months' },
  { value: '3-6 months', label: '3-6 months' },
  { value: '6+ months', label: '6+ months' },
  { value: 'Flexible', label: 'Flexible' },
  { value: 'Other', label: 'Other' },
];

const START_DATE_OPTIONS = [
  { value: 'Immediately', label: 'Immediately' },
  { value: '1 week', label: '1 week' },
  { value: '2 weeks', label: '2 weeks' },
  { value: '3 weeks', label: '3 weeks' },
  { value: '1 month', label: '1 month' },
  { value: '2 months', label: '2 months' },
  { value: '3 months', label: '3 months' },
  { value: '+3 months', label: '+3 months' },
];

const urlValidation = z.string().optional().refine((v) => !v || /^https?:\/\/.+\..+/.test(v), 'Enter a valid URL (e.g. https://company.com)');

const step1Schema = z.object({
  fullName: z.string().min(1, 'Enter your full name'),
  workEmail: z.string()
    .min(1, 'Enter your work email')
    .email('Enter a valid email address (e.g. name@company.com)'),
  company: z.string().min(1, 'Enter your company or organization name'),
  companyWebsite: urlValidation,
  role: z.string().min(1, 'Select your role'),
  roleOther: z.string().optional(),
  country: z.string().min(1, 'Select your country'),
});

const step2Schema = z.object({
  inquiryType: z.string().refine((v) => v === 'specific' || v === 'general', 'Select one of the options above'),
});

const step3Schema = z.object({
  projectCategory: z.string().min(1, 'Select a project category'),
  industry: z.string().optional(),
  budget: z.string().min(1, 'Select an estimated budget range'),
  targetDeadline: z.string().optional(),
  targetDeadlineOther: z.string().optional().refine((v) => {
    if (!v) return true;
    return new Date(v) > new Date();
  }, 'The date must be in the future'),
  startDate: z.string().min(1, 'Select an estimated start date'),
});

const step4Schema = z.object({
  message: z.string().min(1, 'Write a brief description of your project or inquiry'),
  externalLinks: z.string().optional().refine((v) => !v || /^https:\/\/.+\..+/.test(v), 'Enter a valid https URL'),
  ndaRequested: z.boolean().optional(),
  source: z.string().min(1, 'Let us know how you found us'),
  sourceOther: z.string().optional(),
  privacyPolicy: z.boolean().refine((v) => v === true, 'You must accept the Privacy Policy to continue'),
});

const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema];

const fullSchema = z.object({
  fullName: z.string().min(1, 'Enter your full name'),
  workEmail: z.string().min(1, 'Enter your work email').email('Enter a valid email address (e.g. name@company.com)'),
  company: z.string().min(1, 'Enter your company or organization name'),
  companyWebsite: urlValidation,
  role: z.string().min(1, 'Select your role'),
  roleOther: z.string().optional(),
  country: z.string().min(1, 'Select your country'),
  inquiryType: z.string().optional(),
  projectCategory: z.string().optional(),
  industry: z.string().optional(),
  budget: z.string().optional(),
  targetDeadline: z.string().optional(),
  targetDeadlineOther: z.string().optional().refine((v) => {
    if (!v) return true;
    return new Date(v) > new Date();
  }, 'The date must be in the future'),
  startDate: z.string().optional(),
  message: z.string().optional(),
  externalLinks: z.string().optional().refine((v) => !v || /^https:\/\/.+\..+/.test(v), 'Enter a valid https URL'),
  ndaRequested: z.boolean().optional(),
  source: z.string().optional(),
  sourceOther: z.string().optional(),
  privacyPolicy: z.boolean().optional(),
  honeypot: z.string().optional(),
});

type FieldErrors = Record<string, string>;
type FormValues = z.infer<typeof fullSchema>;

const stepVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

const stepTitles = ['Contact Information', 'Nature of Inquiry', 'Project Specifications', 'Message & Attachments'];

function PrivacyCheckbox({ control, error, onPrivacyClick }: {
  control: Control<FormValues>;
  error: boolean;
  onPrivacyClick: () => void;
}) {
  return (
    <Controller
      name="privacyPolicy"
      control={control}
      render={({ field }) => {
        const checked = !!field.value;
        return (
          <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 'var(--space-4)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              flexShrink: 0, width: '16px', height: '16px', marginTop: '2px',
              border: `0.5px solid ${error ? 'var(--color-input-error)' : 'var(--color-input-border)'}`,
              borderRadius: 'var(--radius)',
              background: checked ? 'var(--color-green)' : 'var(--color-input-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background var(--transition-hover), border-color var(--transition-hover)',
            }}>
              {checked && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1.5 5l2.5 2.5 4.5-5" stroke="#060000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="text-base" style={{ color: error ? 'var(--color-input-error)' : 'var(--color-neutral-400)', lineHeight: 1.5 }}>
              I agree to the{' '}
              <button type="button" onClick={onPrivacyClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px', font: 'inherit' }}>
                Privacy Policy
              </button>
            </span>
          </label>
        );
      }}
    />
  );
}

export default function ModalBusiness({ isOpen, onClose, onPrivacyClick }: ModalBusinessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [skippedSteps, setSkippedSteps] = useState<number[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; base64: string } | null>(null);
  const [fileError, setFileError] = useState('');

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setFileError('Only PDF files are accepted.');
      e.target.value = '';
      return;
    }
    if (file.size > 30 * 1024 * 1024) {
      setFileError('File exceeds the 30 MB limit.');
      e.target.value = '';
      return;
    }
    setFileError('');
    const reader = new FileReader();
    reader.onload = () => {
      setAttachedFile({ name: file.name, base64: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  function handleFileRemove() {
    setAttachedFile(null);
    setFileError('');
  }

  const SESSION_KEY = 'senzo_business_form';

  const savedSession = useRef((() => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? 'null'); } catch { return null; }
  })()).current;

  const { register, watch, reset, getValues, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: savedSession?.values ?? {
      fullName: '', workEmail: '', company: '', companyWebsite: '', role: '', roleOther: '', country: '',
      inquiryType: '',
      projectCategory: '', industry: '', budget: '', targetDeadline: '', targetDeadlineOther: '', startDate: '',
      message: '', externalLinks: '', ndaRequested: false, source: '', sourceOther: '', privacyPolicy: false,
      honeypot: '',
    },
  });

  const watchedValues = watch();
  const inquiryType = watchedValues.inquiryType;
  const messageValue = watchedValues.message ?? '';
  const privacyChecked = watchedValues.privacyPolicy;
  const ndaChecked = watchedValues.ndaRequested;
  const isGeneralInquiry = inquiryType === 'general';
  const isStepValid = stepSchemas[currentStep].safeParse(watchedValues).success;

  useEffect(() => {
    if (privacyChecked && fieldErrors.privacyPolicy) {
      setFieldErrors((prev) => { const next = { ...prev }; delete next.privacyPolicy; return next; });
    }
  }, [privacyChecked]);

  // Restore step and file from session on first open
  useEffect(() => {
    if (!isOpen || !savedSession) return;
    if (savedSession.step) setCurrentStep(savedSession.step);
    if (savedSession.completedSteps) setCompletedSteps(savedSession.completedSteps);
    if (savedSession.skippedSteps) setSkippedSteps(savedSession.skippedSteps);
    if (savedSession.attachedFile) setAttachedFile(savedSession.attachedFile);
  }, [isOpen]);

  // Persist form state to sessionStorage on every change
  useEffect(() => {
    const sub = watch((values) => {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        values,
        step: currentStep,
        completedSteps,
        skippedSteps,
        attachedFile,
      }));
    });
    return () => sub.unsubscribe();
  }, [watch, currentStep, completedSteps, skippedSteps, attachedFile]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  function handleClose() {
    onClose();
    setTimeout(() => {
      setCurrentStep(0);
      setCompletedSteps([]);
      setSkippedSteps([]);
      setFieldErrors({});
      setSubmitted(false);
      setSubmitError('');
      setAttachedFile(null);
      setFileError('');
      reset();
    }, 300);
  }

  async function handleNext() {
    const values = getValues();
    const result = stepSchemas[currentStep].safeParse(values);
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.issues.forEach((e) => { if (e.path[0]) errs[String(e.path[0])] = e.message; });
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);

    if (currentStep === 1 && isGeneralInquiry) {
      setSkippedSteps((prev) => [...new Set([...prev, 2])]);
      setCurrentStep(3);
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleBack() {
    setFieldErrors({});
    if (currentStep === 3 && isGeneralInquiry) {
      setCurrentStep(1);
    } else {
      setCurrentStep((s) => s - 1);
    }
  }

  function handleStepClick(index: number) {
    if (skippedSteps.includes(index)) return;
    setCurrentStep(index);
    setFieldErrors({});
  }

  async function handleSubmitForm() {
    const values = getValues();

    // Validate step 4 fields first
    const step4Result = step4Schema.safeParse(values);
    if (!step4Result.success) {
      const errs: FieldErrors = {};
      step4Result.error.issues.forEach((e) => { if (e.path[0]) errs[String(e.path[0])] = e.message; });
      setFieldErrors(errs);
      return;
    }

    // Guard: honeypot
    if (values.honeypot) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/submit-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, ...(attachedFile ? { attachedFile } : {}) }),
      });

      if (!res.ok) {
        let serverMessage = '';
        try {
          const body = await res.json();
          serverMessage = body?.error ?? body?.message ?? '';
        } catch { /* non-JSON response */ }

        if (res.status === 400) {
          setSubmitError(serverMessage || 'Some fields are invalid. Please review your answers and try again.');
        } else if (res.status === 413) {
          setSubmitError('The attached file is too large. Please reduce the file size and try again.');
        } else if (res.status === 429) {
          setSubmitError('Too many requests. Please wait a few minutes and try again.');
        } else if (res.status >= 500) {
          setSubmitError('The server encountered an error. Please try again in a few minutes or contact us directly at info@senzostudio.com.');
        } else {
          setSubmitError(serverMessage || 'Submission failed. Please try again or contact us at info@senzostudio.com.');
        }
        return;
      }

      sessionStorage.removeItem(SESSION_KEY);
      setSubmitted(true);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setSubmitError('No internet connection. Please check your network and try again.');
      } else {
        setSubmitError('An unexpected error occurred. Please try again or contact us at info@senzostudio.com.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', inset: 0,
            background: 'var(--color-background)',
            zIndex: 100,
            overflowY: 'auto',
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="modal-content"
            style={{
              maxWidth: 'var(--max-width)', width: '100%', margin: '0 auto',
              paddingBottom: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
              <h2 className="title-l">Business Inquiries</h2>
              <BtnIcon as="button" variant="outline" label="Close" onClick={handleClose} style={{ flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </BtnIcon>
            </div>
            {!submitted && (
              <p className="text-base" style={{ marginBottom: 'var(--space-6)' }}>
                Looking for high-end VFX or CGI for your next production? Fill out the form below, and our team will get back to you within one business day.
              </p>
            )}
            {!submitted && (
              <FormStepper
                steps={STEPS}
                currentStep={currentStep}
                completedSteps={completedSteps}
                skippedSteps={skippedSteps}
                onStepClick={handleStepClick}
              />
            )}
          </motion.div>

          <div>
            <div className="modal-content" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
              <AnimatePresence mode="wait">

                {submitted ? (
                  <motion.div key="success" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                    <p className="text-base" style={{ lineHeight: 1.7, marginBottom: 'var(--space-7)', maxWidth: '640px' }}>
                      Thank you for contacting Senzo Studio. We have registered your inquiry and, if applicable, the non-disclosure agreement (NDA). Our team will review the details and contact you within one business day.
                    </p>
                    <Btn variant="accept" as="button" onClick={handleClose}>Accept</Btn>
                  </motion.div>
                ) : (
                  <motion.div key={currentStep} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>

                    {/* Honeypot */}
                    <input {...register('honeypot')} type="text" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    <h3 className="text-l" style={{
                      letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase',
                      marginBottom: 'var(--space-7)',
                      borderBottom: 'var(--border)', paddingBottom: 'var(--space-4)', borderRadius: 0,
                    }}>
                      {stepTitles[currentStep]}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

                      {/* STEP 1 — Contact */}
                      {currentStep === 0 && (
                        <>
                          <FormField label="Full name" required error={errors.fullName?.message}>
                            <InputText registration={register('fullName')} placeholder="Your name" error={!!errors.fullName} value={watch('fullName')} autoComplete="name" />
                          </FormField>
                          <FormField label="Work email" required error={errors.workEmail?.message}>
                            <InputText registration={register('workEmail')} type="email" placeholder="Your email address @email.com" error={!!errors.workEmail} value={watch('workEmail')} autoComplete="email" />
                          </FormField>
                          <FormField label="Company / Organization" required error={errors.company?.message}>
                            <InputText registration={register('company')} placeholder="Your company or organization" error={!!errors.company} value={watch('company')} autoComplete="organization" />
                          </FormField>
                          <FormField label="Company Website" error={errors.companyWebsite?.message}>
                            <InputText registration={register('companyWebsite')} type="url" placeholder="https://yourcompany.com" error={!!errors.companyWebsite} value={watch('companyWebsite')} autoComplete="url" />
                          </FormField>
                          <FormField label="Role" required error={errors.role?.message}>
                            <InputSelect registration={register('role')} placeholder="Your role" options={ROLE_OPTIONS} error={!!errors.role} autoComplete="organization-title" />
                          </FormField>
                          {watch('role') === 'Other' && (
                            <FormField label="Specify your role" error={errors.roleOther?.message}>
                              <InputText registration={register('roleOther')} placeholder="Describe your role" error={!!errors.roleOther} value={watch('roleOther')} autoComplete="organization-title" />
                            </FormField>
                          )}
                          <FormField label="Country" required error={errors.country?.message}>
                            <InputSelect registration={register('country')} placeholder="Your country" options={COUNTRY_OPTIONS} error={!!errors.country} autoComplete="country-name" />
                          </FormField>
                        </>
                      )}

                      {/* STEP 2 — Nature */}
                      {currentStep === 1 && (
                        <>
                          {fieldErrors.inquiryType && (
                            <p className="text-xs" style={{ color: 'var(--color-input-error)' }}>
                              {fieldErrors.inquiryType}
                            </p>
                          )}
                          <InputCheckbox
                            registration={register('inquiryType')}
                            checked={inquiryType === 'specific'}
                            label="Option A. I have a specific project to discuss (Step 3)."
                            error={!!fieldErrors.inquiryType}
                            value="specific"
                          />
                          <InputCheckbox
                            registration={register('inquiryType')}
                            checked={inquiryType === 'general'}
                            label="Option B. General inquiry / Partnership / Just saying hi (Step 4)."
                            error={!!fieldErrors.inquiryType}
                            value="general"
                          />
                        </>
                      )}

                      {/* STEP 3 — Project specs */}
                      {currentStep === 2 && (
                        <>
                          <FormField label="Project Category" required error={errors.projectCategory?.message}>
                            <InputSelect registration={register('projectCategory')} placeholder="Your project category" options={CATEGORY_OPTIONS} error={!!errors.projectCategory} />
                          </FormField>
                          <FormField label="Industry / Brand" error={errors.industry?.message}>
                            <InputText registration={register('industry')} placeholder="Your industry / brand" error={!!errors.industry} value={watch('industry')} />
                          </FormField>
                          <FormField label="Estimated Budget (EUR)" required error={errors.budget?.message}>
                            <InputSelect registration={register('budget')} placeholder="Your estimated budget (EUR)" options={BUDGET_OPTIONS} error={!!errors.budget} />
                          </FormField>
                          <FormField label="Target Deadline" error={errors.targetDeadline?.message}>
                            <InputSelect registration={register('targetDeadline')} placeholder="Your target deadline" options={DEADLINE_OPTIONS} error={!!errors.targetDeadline} />
                          </FormField>
                          {watch('targetDeadline') === 'Other' && (
                            <FormField label="Specify date" error={errors.targetDeadlineOther?.message}>
                              <InputText registration={register('targetDeadlineOther')} type="date" error={!!errors.targetDeadlineOther} value={watch('targetDeadlineOther')} />
                            </FormField>
                          )}
                          <FormField label="Estimated Start Date" required error={errors.startDate?.message}>
                            <InputSelect registration={register('startDate')} placeholder="Your estimated start date" options={START_DATE_OPTIONS} error={!!errors.startDate} />
                          </FormField>
                        </>
                      )}

                      {/* STEP 4 — Message */}
                      {currentStep === 3 && (
                        <>
                          <FormField label="Additional Message" required error={errors.message?.message}>
                            <InputTextarea
                              registration={register('message')}
                              placeholder="Tell us about your project. Feel free to include links to briefs, references, or any relevant materials (Google Drive, Frame.io, WeTransfer, etc.)"
                              maxLength={3000}
                              watchValue={messageValue}
                              rows={7}
                              error={!!errors.message}
                            />
                          </FormField>

                          {/* File attachment */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <label className="text-s" style={{ color: 'var(--color-neutral-400)' }}>
                              Attach Brief <span className="text-xs" style={{ color: 'var(--color-neutral-600)' }}>— PDF only, max 30 MB</span>
                            </label>
                            {!attachedFile ? (
                              <label style={{
                                display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                                background: 'var(--color-input-bg)',
                                border: `0.5px dashed ${fileError ? 'var(--color-input-error)' : 'var(--color-input-border)'}`,
                                borderRadius: 'var(--radius)',
                                padding: 'var(--space-4) var(--space-5)',
                                cursor: 'pointer',
                                transition: 'border-color var(--transition-hover)',
                              }}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: 'var(--color-neutral-500)' }}>
                                  <path d="M7 1v8M4 4l3-3 3 3M1 10v1.5A1.5 1.5 0 002.5 13h9a1.5 1.5 0 001.5-1.5V10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="text-s" style={{ color: 'var(--color-neutral-500)' }}>Click to upload PDF</span>
                                <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
                              </label>
                            ) : (
                              <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                background: 'var(--color-input-bg)',
                                border: '0.5px solid var(--color-input-border)',
                                borderRadius: 'var(--radius)',
                                padding: 'var(--space-4) var(--space-5)',
                                gap: 'var(--space-3)',
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', overflow: 'hidden' }}>
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: 'var(--color-red-500)' }}>
                                    <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25"/>
                                    <path d="M4 5h6M4 7.5h6M4 10h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                                  </svg>
                                  <span className="text-s" style={{ color: 'var(--color-neutral-300)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{attachedFile.name}</span>
                                </div>
                                <button type="button" onClick={handleFileRemove} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-neutral-500)', flexShrink: 0, lineHeight: 1 }}>
                                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                  </svg>
                                </button>
                              </div>
                            )}
                            {fileError && <p className="text-xs" style={{ color: 'var(--color-input-error)' }}>{fileError}</p>}
                          </div>

                          <FormField label="Brief Link" error={errors.externalLinks?.message}>
                            <InputText registration={register('externalLinks')} type="url" placeholder="https://drive.google.com/your-brief" error={!!errors.externalLinks} value={watch('externalLinks')} />
                          </FormField>
                          <FormField label="How did you hear from us?" required error={errors.source?.message || fieldErrors.source}>
                            <InputSelect registration={register('source')} placeholder="Select one" options={SOURCE_OPTIONS} error={!!errors.source || !!fieldErrors.source} />
                          </FormField>
                          {watch('source') === 'Other' && (
                            <FormField label="Please specify" error={errors.sourceOther?.message}>
                              <InputText registration={register('sourceOther')} placeholder="Tell us how you found us" error={!!errors.sourceOther} value={watch('sourceOther')} />
                            </FormField>
                          )}
                          <InputCheckbox
                            registration={register('ndaRequested')}
                            checked={!!ndaChecked}
                            label="NDA Requirement — I'd like to discuss a Non-Disclosure Agreement before sharing project details."
                          />
                          <PrivacyCheckbox
                            control={control}
                            error={!!fieldErrors.privacyPolicy}
                            onPrivacyClick={onPrivacyClick}
                          />
                          {fieldErrors.privacyPolicy && (
                            <p className="text-xs" style={{ color: 'var(--color-input-error)' }}>
                              {fieldErrors.privacyPolicy}
                            </p>
                          )}
                        </>
                      )}

                    </div>

                    {/* Navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
                      <Btn variant="secondary" as="button" type="button" size="md" onClick={handleBack} active={false} disabled={currentStep === 0}>Back</Btn>
                      {currentStep < 3
                        ? <Btn variant="accept" as="button" type="button" onClick={handleNext} disabled={!isStepValid}>Next</Btn>
                        : <Btn variant="accept" as="button" type="button" onClick={handleSubmitForm} disabled={!isStepValid || isSubmitting}>{isSubmitting ? 'Sending...' : 'Submit'}</Btn>
                      }
                    </div>
                    {submitError && <p className="text-s" style={{ color: 'var(--color-input-error)', marginTop: 'var(--space-4)' }}>{submitError}</p>}

                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
