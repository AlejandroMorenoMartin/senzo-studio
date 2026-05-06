import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  { value: 'Under $10K', label: 'Under $10K' },
  { value: '$10K – $50K', label: '$10K – $50K' },
  { value: '$50K – $150K', label: '$50K – $150K' },
  { value: '$150K – $500K', label: '$150K – $500K' },
  { value: '$500K+', label: '$500K+' },
  { value: 'TBD', label: 'TBD' },
];

const CALL_TIME_OPTIONS = [
  { value: 'Early Morning (8–10h)', label: 'Early Morning (8–10h)' },
  { value: 'Morning (10–13h)', label: 'Morning (10–13h)' },
  { value: 'Afternoon (14–17h)', label: 'Afternoon (14–17h)' },
  { value: 'Late Afternoon (17–19h)', label: 'Late Afternoon (17–19h)' },
];

const DEADLINE_OPTIONS = [
  { value: 'ASAP', label: 'ASAP' },
  { value: '1 month', label: '1 month' },
  { value: '2-3 months', label: '2-3 months' },
  { value: '3-6 months', label: '3-6 months' },
  { value: '6+ months', label: '6+ months' },
  { value: 'Flexible', label: 'Flexible' },
];

const START_DATE_OPTIONS = [
  { value: 'Immediately', label: 'Immediately' },
  { value: 'Within 2 weeks', label: 'Within 2 weeks' },
  { value: 'Within a month', label: 'Within a month' },
  { value: '1-3 months', label: '1-3 months' },
  { value: 'TBD', label: 'TBD' },
];

const step1Schema = z.object({
  fullName: z.string().min(1, 'Enter your full name'),
  workEmail: z.string()
    .min(1, 'Enter your work email')
    .email('Enter a valid email address (e.g. name@company.com)'),
  company: z.string().min(1, 'Enter your company or organization name'),
  role: z.string().min(1, 'Select your role'),
  country: z.string().min(1, 'Select your country'),
});

const step2Schema = z.object({
  inquiryType: z.string().refine((v) => v === 'specific' || v === 'general', 'Select one of the options above'),
});

const step3Schema = z.object({
  projectCategory: z.string().min(1, 'Select a project category'),
  industry: z.string().min(1, 'Enter your industry or brand name'),
  budget: z.string().min(1, 'Select an estimated budget range'),
  targetDeadline: z.string().optional(),
  startDate: z.string().min(1, 'Select an estimated start date'),
});

const step4Schema = z.object({
  message: z.string().min(1, 'Write a brief description of your project or inquiry'),
  externalLinks: z.string().optional(),
  ndaRequested: z.boolean().optional(),
  privacyPolicy: z.boolean().refine((v) => v === true, 'You must accept the Privacy Policy to continue'),
});

const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema];

type FieldErrors = Record<string, string>;

interface FormValues {
  fullName: string;
  workEmail: string;
  company: string;
  role: string;
  country: string;
  inquiryType: string;
  projectCategory: string;
  industry: string;
  budget: string;
  targetDeadline: string;
  startDate: string;
  message: string;
  externalLinks: string;
  preferredCallTime: string;
  ndaRequested: boolean;
  privacyPolicy: boolean;
  honeypot: string;
}

const stepVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

const stepTitles = ['Contact Information', 'Nature of Inquiry', 'Project Specifications', 'Message & Attachments'];

export default function ModalBusiness({ isOpen, onClose, onPrivacyClick }: ModalBusinessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [skippedSteps, setSkippedSteps] = useState<number[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, watch, reset, getValues } = useForm<FormValues>({
    defaultValues: {
      fullName: '', workEmail: '', company: '', role: '', country: '',
      inquiryType: '',
      projectCategory: '', industry: '', budget: '', targetDeadline: '', startDate: '',
      message: '', externalLinks: '', preferredCallTime: '', ndaRequested: false, privacyPolicy: false,
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
    const result = step4Schema.safeParse(values);
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.issues.forEach((e) => { if (e.path[0]) errs[String(e.path[0])] = e.message; });
      setFieldErrors(errs);
      return;
    }
    if (values.honeypot) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/submit-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('error');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
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

                    <h3 className="text-xl" style={{
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
                          <FormField label="Full name" required error={fieldErrors.fullName}>
                            <InputText registration={register('fullName')} placeholder="Your name" error={!!fieldErrors.fullName} value={watch('fullName')} />
                          </FormField>
                          <FormField label="Work email" required error={fieldErrors.workEmail}>
                            <InputText registration={register('workEmail')} type="email" placeholder="Your email address @email.com" error={!!fieldErrors.workEmail} value={watch('workEmail')} />
                          </FormField>
                          <FormField label="Company / Organization" required error={fieldErrors.company}>
                            <InputText registration={register('company')} placeholder="Your company or organization" error={!!fieldErrors.company} value={watch('company')} />
                          </FormField>
                          <FormField label="Role" required error={fieldErrors.role}>
                            <InputSelect registration={register('role')} placeholder="Your role" options={ROLE_OPTIONS} error={!!fieldErrors.role} />
                          </FormField>
                          <FormField label="Country" required error={fieldErrors.country}>
                            <InputSelect registration={register('country')} placeholder="Your country" options={COUNTRY_OPTIONS} error={!!fieldErrors.country} />
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
                          <FormField label="Project Category" required error={fieldErrors.projectCategory}>
                            <InputSelect registration={register('projectCategory')} placeholder="Your project category" options={CATEGORY_OPTIONS} error={!!fieldErrors.projectCategory} />
                          </FormField>
                          <FormField label="Industry / Brand" required error={fieldErrors.industry}>
                            <InputText registration={register('industry')} placeholder="Your industry / brand" error={!!fieldErrors.industry} value={watch('industry')} />
                          </FormField>
                          <FormField label="Estimated Budget (USD)" required error={fieldErrors.budget}>
                            <InputSelect registration={register('budget')} placeholder="Your estimated budget (USD)" options={BUDGET_OPTIONS} error={!!fieldErrors.budget} />
                          </FormField>
                          <FormField label="Target Deadline" error={fieldErrors.targetDeadline}>
                            <InputSelect registration={register('targetDeadline')} placeholder="Your target deadline" options={DEADLINE_OPTIONS} error={!!fieldErrors.targetDeadline} />
                          </FormField>
                          <FormField label="Estimated Start Date" required error={fieldErrors.startDate}>
                            <InputSelect registration={register('startDate')} placeholder="Your estimated start date" options={START_DATE_OPTIONS} error={!!fieldErrors.startDate} />
                          </FormField>
                        </>
                      )}

                      {/* STEP 4 — Message */}
                      {currentStep === 3 && (
                        <>
                          <FormField label="Additional Message" required error={fieldErrors.message}>
                            <InputTextarea
                              registration={register('message')}
                              placeholder="Tell us about your project. Feel free to include links to briefs, references, or any relevant materials (Google Drive, Frame.io, WeTransfer, etc.)"
                              maxLength={3000}
                              watchValue={messageValue}
                              rows={7}
                              error={!!fieldErrors.message}
                            />
                          </FormField>
                          <FormField label="Preferred time to be contacted" error={fieldErrors.preferredCallTime}>
                            <InputSelect registration={register('preferredCallTime')} placeholder="Select a time slot" options={CALL_TIME_OPTIONS} error={!!fieldErrors.preferredCallTime} />
                          </FormField>
                          <InputCheckbox
                            registration={register('ndaRequested')}
                            checked={!!ndaChecked}
                            label="NDA Requirement — I'd like to discuss a Non-Disclosure Agreement before sharing project details."
                          />
                          <FormField label="External Links / Brief" error={fieldErrors.externalLinks}>
                            <InputText registration={register('externalLinks')} placeholder="Paste links to Google Drive, Frame.io, WeTransfer, etc." error={!!fieldErrors.externalLinks} value={watch('externalLinks')} />
                          </FormField>
                          <InputCheckbox
                            registration={register('privacyPolicy')}
                            checked={!!privacyChecked}
                            error={!!fieldErrors.privacyPolicy}
                            label={
                              <>I agree to the{' '}
                                <button type="button" onClick={onPrivacyClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px', font: 'inherit' }}>
                                  Privacy Policy
                                </button>
                              </>
                            }
                          />
                          {fieldErrors.privacyPolicy && (
                            <p className="text-xs" style={{ color: 'var(--color-input-error)' }}>{fieldErrors.privacyPolicy}</p>
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
