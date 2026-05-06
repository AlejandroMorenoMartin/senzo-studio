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

interface ModalFreelancerProps {
  isOpen: boolean;
  onClose: () => void;
  onPrivacyClick: () => void;
}

const STEPS = ['Personal information', 'Professional Profile', 'Portfolio & Links', 'Final Details'];

const DEPARTMENTS = ['2D & Comp', '3D & Anim', 'FX & Render', 'Other'];

const AVAILABILITY_OPTIONS = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Project-based', label: 'Project-based' },
  { value: 'Not available', label: 'Not available' },
];

const CALL_TIME_OPTIONS = [
  { value: 'Early Morning (8–10h)', label: 'Early Morning (8–10h)' },
  { value: 'Morning (10–13h)', label: 'Morning (10–13h)' },
  { value: 'Afternoon (14–17h)', label: 'Afternoon (14–17h)' },
  { value: 'Late Afternoon (17–19h)', label: 'Late Afternoon (17–19h)' },
];

const SOURCE_OPTIONS = [
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Vimeo', label: 'Vimeo' },
  { value: 'Behance', label: 'Behance' },
  { value: 'ArtStation', label: 'ArtStation' },
  { value: 'Google', label: 'Google' },
  { value: 'Other', label: 'Other' },
];


const step1Schema = z.object({
  firstName: z.string().min(1, 'Enter your first name'),
  lastName: z.string().min(1, 'Enter your last name'),
  email: z.string()
    .min(1, 'Enter your email address')
    .email('Enter a valid email address (e.g. name@email.com)'),
  country: z.string().min(1, 'Select your country'),
});

const step2Schema = z.object({
  departments: z.array(z.string()).min(1, 'Select at least one department'),
  mainSoftware: z.string().min(1, 'List your main software (e.g. Houdini, Nuke, Maya)'),
  yearsExperience: z.string().min(1, 'Enter your years of experience'),
  expectedRate: z.string().min(1, 'Enter your expected daily or hourly rate'),
  availability: z.string().min(1, 'Select your availability'),
});

const step3Schema = z.object({
  reelLink: z.string()
    .min(1, 'Enter your reel URL')
    .url('Enter a valid URL (e.g. https://vimeo.com/youreel)'),
  reelPassword: z.string().optional(),
  portfolioUrl: z.string().url('Enter a valid URL (e.g. https://yourportfolio.com)').or(z.literal('')).optional(),
  websiteUrl: z.string().url('Enter a valid URL (e.g. https://yourwebsite.com)').or(z.literal('')).optional(),
});

const step4Schema = z.object({
  source: z.string().min(1, 'Let us know how you found us'),
  message: z.string().optional(),
  privacyPolicy: z.boolean().refine((v) => v === true, 'You must accept the Privacy Policy to continue'),
});

const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema];

type FieldErrors = Record<string, string>;

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  departments: string[];
  mainSoftware: string;
  yearsExperience: string;
  expectedRate: string;
  availability: string;
  reelLink: string;
  reelPassword: string;
  portfolioUrl: string;
  websiteUrl: string;
  source: string;
  message: string;
  preferredCallTime: string;
  privacyPolicy: boolean;
  honeypot: string;
}

const stepVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

const stepTitles = ['Personal Information', 'Professional Profile', 'Portfolio & Links', 'Final Details'];

export default function ModalFreelancer({ isOpen, onClose, onPrivacyClick }: ModalFreelancerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, watch, reset, getValues } = useForm<FormValues>({
    defaultValues: {
      firstName: '', lastName: '', email: '', country: '',
      departments: [], mainSoftware: '', yearsExperience: '', expectedRate: '', availability: '',
      reelLink: '', reelPassword: '', portfolioUrl: '', websiteUrl: '',
      source: '', message: '', preferredCallTime: '', privacyPolicy: false, honeypot: '',
    },
  });

  const watchedValues = watch();
  const reelLink = watchedValues.reelLink;
  const messageValue = watchedValues.message ?? '';
  const privacyChecked = watchedValues.privacyPolicy;
  const selectedDepts = watchedValues.departments ?? [];

  const showReelPassword = typeof reelLink === 'string' &&
    (reelLink.includes('vimeo') || reelLink.includes('frame.io'));

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
    setCurrentStep((s) => s + 1);
  }

  function handleBack() {
    setCurrentStep((s) => s - 1);
    setFieldErrors({});
  }

  function handleStepClick(index: number) {
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
      const res = await fetch('/api/submit-freelancer', {
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
              <h2 className="title-l">Freelancer Applications</h2>
              <BtnIcon as="button" variant="outline" label="Close" onClick={handleClose} style={{ flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </BtnIcon>
            </div>
            {!submitted && (
              <p className="text-base" style={{ marginBottom: 'var(--space-6)' }}>
                Join our talent roster and be considered for future productions. Fill out the form — our team reviews all applications.
              </p>
            )}
            {!submitted && (
              <FormStepper steps={STEPS} currentStep={currentStep} completedSteps={completedSteps} onStepClick={handleStepClick} />
            )}
          </motion.div>

          <div>
            <div className="modal-content" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
              <AnimatePresence mode="wait">

                {submitted ? (
                  <motion.div key="success" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                    <p className="text-base" style={{ lineHeight: 1.7, marginBottom: 'var(--space-7)', maxWidth: '640px' }}>
                      Thank you for your interest in joining Senzo Studio. We have received your profile and portfolio successfully. Our production team will review your materials and contact you directly when your profile and availability align with our production needs.
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

                      {currentStep === 0 && (
                        <>
                          <FormField label="First name" required error={fieldErrors.firstName}>
                            <InputText registration={register('firstName')} placeholder="Your name" error={!!fieldErrors.firstName} value={watch('firstName')} />
                          </FormField>
                          <FormField label="Last name" required error={fieldErrors.lastName}>
                            <InputText registration={register('lastName')} placeholder="Your last name" error={!!fieldErrors.lastName} value={watch('lastName')} />
                          </FormField>
                          <FormField label="Email address" required error={fieldErrors.email}>
                            <InputText registration={register('email')} type="email" placeholder="Your email address @email.com" error={!!fieldErrors.email} value={watch('email')} />
                          </FormField>
                          <FormField label="Country of residence" required error={fieldErrors.country}>
                            <InputSelect registration={register('country')} placeholder="Your country" options={COUNTRY_OPTIONS} error={!!fieldErrors.country} />
                          </FormField>
                        </>
                      )}

                      {currentStep === 1 && (
                        <>
                          <FormField label="Department(s)" required error={fieldErrors.departments}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                              {DEPARTMENTS.map((dept) => (
                                <InputCheckbox
                                  key={dept}
                                  registration={register('departments')}
                                  label={dept}
                                  checked={selectedDepts.includes(dept)}
                                />
                              ))}
                            </div>
                          </FormField>
                          <FormField label="Main Software(s)" required error={fieldErrors.mainSoftware}>
                            <InputText registration={register('mainSoftware')} placeholder="Your software(s)" error={!!fieldErrors.mainSoftware} value={watch('mainSoftware')} />
                          </FormField>
                          <FormField label="Years of experience" required error={fieldErrors.yearsExperience}>
                            <InputText registration={register('yearsExperience')} type="number" placeholder="Your years of experience" error={!!fieldErrors.yearsExperience} value={watch('yearsExperience')} />
                          </FormField>
                          <FormField label="Expected Rate (USD)" required error={fieldErrors.expectedRate}>
                            <InputText registration={register('expectedRate')} type="number" placeholder="Your expected rate" error={!!fieldErrors.expectedRate} value={watch('expectedRate')} />
                          </FormField>
                          <FormField label="Availability" required error={fieldErrors.availability}>
                            <InputSelect registration={register('availability')} placeholder="Your availability" options={AVAILABILITY_OPTIONS} error={!!fieldErrors.availability} />
                          </FormField>
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <FormField label="Reel link" required error={fieldErrors.reelLink}>
                            <InputText registration={register('reelLink')} type="url" placeholder="Your URL reel link" error={!!fieldErrors.reelLink} value={watch('reelLink')} />
                          </FormField>
                          {showReelPassword && (
                            <FormField label="Reel password" error={fieldErrors.reelPassword}>
                              <InputText registration={register('reelPassword')} placeholder="Your reel password" error={!!fieldErrors.reelPassword} value={watch('reelPassword')} />
                            </FormField>
                          )}
                          <FormField label="Portfolio / ArtStation" error={fieldErrors.portfolioUrl}>
                            <InputText registration={register('portfolioUrl')} type="url" placeholder="Your URL portfolio / ArtStation link" error={!!fieldErrors.portfolioUrl} value={watch('portfolioUrl')} />
                          </FormField>
                          <FormField label="Personal Website" error={fieldErrors.websiteUrl}>
                            <InputText registration={register('websiteUrl')} type="url" placeholder="Your URL personal website link" error={!!fieldErrors.websiteUrl} value={watch('websiteUrl')} />
                          </FormField>
                        </>
                      )}

                      {currentStep === 3 && (
                        <>
                          <FormField label="How did you hear from us?" required error={fieldErrors.source}>
                            <InputSelect registration={register('source')} placeholder="Select one" options={SOURCE_OPTIONS} error={!!fieldErrors.source} />
                          </FormField>
                          <FormField label="Additional Message" error={fieldErrors.message}>
                            <InputTextarea registration={register('message')} placeholder="Your additional message" watchValue={messageValue} rows={5} />
                          </FormField>
                          <FormField label="Preferred time to be contacted" error={fieldErrors.preferredCallTime}>
                            <InputSelect registration={register('preferredCallTime')} placeholder="Select a time slot" options={CALL_TIME_OPTIONS} error={!!fieldErrors.preferredCallTime} />
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
