import { useEffect, useRef, useState } from 'react';
import { useForm, Controller, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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

// STEPS and stepTitles are initialized inside component using useTranslation

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
  projectCategoryOther: z.string().optional(),
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
  projectCategoryOther: z.string().optional(),
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

// stepTitles initialized inside component

function PrivacyCheckbox({ control, error, onPrivacyClick }: {
  control: Control<FormValues>;
  error: boolean;
  onPrivacyClick: () => void;
}) {
  const { t } = useTranslation('contact');
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
              {t('contact:modalBusiness.fields.privacyPolicy.label')}{' '}
              <button type="button" onClick={onPrivacyClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px', font: 'inherit' }}>
                {t('contact:modalBusiness.fields.privacyPolicy.linkLabel')}
              </button>
            </span>
          </label>
        );
      }}
    />
  );
}

export default function ModalBusiness({ isOpen, onClose, onPrivacyClick }: ModalBusinessProps) {
  const { t } = useTranslation(['contact', 'common']);
  const stepsRaw = t('contact:modalBusiness.steps', { returnObjects: true });
  const STEPS: string[] = Array.isArray(stepsRaw) ? stepsRaw : [];
  const stepTitlesRaw = t('contact:modalBusiness.stepTitles', { returnObjects: true });
  const stepTitles: string[] = Array.isArray(stepTitlesRaw) ? stepTitlesRaw : [];
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
    const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError(t('contact:modalBusiness.errors.fileType'));
      e.target.value = '';
      return;
    }
    if (file.size > 30 * 1024 * 1024) {
      setFileError(t('contact:modalBusiness.errors.fileSize'));
      e.target.value = '';
      return;
    }
    setFileError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      setAttachedFile({ name: file.name, base64: reader.result });
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
      projectCategory: '', projectCategoryOther: '', industry: '', budget: '', targetDeadline: '', targetDeadlineOther: '', startDate: '',
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
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

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
          setSubmitError(serverMessage || t('contact:modalBusiness.errors.submit400'));
        } else if (res.status === 413) {
          setSubmitError(t('contact:modalBusiness.errors.submit413'));
        } else if (res.status === 429) {
          setSubmitError(t('contact:modalBusiness.errors.submit429'));
        } else if (res.status >= 500) {
          setSubmitError(t('contact:modalBusiness.errors.submit500'));
        } else {
          setSubmitError(serverMessage || t('contact:modalBusiness.errors.submitGeneric'));
        }
        return;
      }

      sessionStorage.removeItem(SESSION_KEY);
      setSubmitted(true);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setSubmitError(t('contact:modalBusiness.errors.networkError'));
      } else {
        setSubmitError(t('contact:modalBusiness.errors.unexpectedError'));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-business-title"
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.45, 0, 0.55, 1] }}
          style={{
            position: 'fixed', inset: 0,
            background: 'var(--color-background)',
            zIndex: 100,
            overflowY: 'auto',
            transformOrigin: 'center',
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
              <h2 id="modal-business-title" className="title-l">{t('contact:modalBusiness.title')}</h2>
              <BtnIcon as="button" variant="outline" label={t('common:buttons.close')} onClick={handleClose} style={{ flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </BtnIcon>
            </div>
            {!submitted && (
              <p className="text-base" style={{ marginBottom: 'var(--space-6)' }}>
                {t('contact:modalBusiness.intro')}
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
                      {t('contact:modalBusiness.success')}
                    </p>
                    <Btn variant="accept" as="button" onClick={handleClose}>{t('common:buttons.accept')}</Btn>
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
                          <FormField label={t('contact:modalBusiness.fields.fullName.label')} required error={errors.fullName?.message}>
                            <InputText registration={register('fullName')} placeholder={t('contact:modalBusiness.fields.fullName.placeholder')} error={!!errors.fullName} value={watch('fullName')} autoComplete="name" />
                          </FormField>
                          <FormField label={t('contact:modalBusiness.fields.workEmail.label')} required error={errors.workEmail?.message}>
                            <InputText registration={register('workEmail')} type="email" placeholder={t('contact:modalBusiness.fields.workEmail.placeholder')} error={!!errors.workEmail} value={watch('workEmail')} autoComplete="email" />
                          </FormField>
                          <FormField label={t('contact:modalBusiness.fields.company.label')} required error={errors.company?.message}>
                            <InputText registration={register('company')} placeholder={t('contact:modalBusiness.fields.company.placeholder')} error={!!errors.company} value={watch('company')} autoComplete="organization" />
                          </FormField>
                          <FormField label={t('contact:modalBusiness.fields.companyWebsite.label')} error={errors.companyWebsite?.message}>
                            <InputText registration={register('companyWebsite')} type="url" placeholder={t('contact:modalBusiness.fields.companyWebsite.placeholder')} error={!!errors.companyWebsite} value={watch('companyWebsite')} autoComplete="url" />
                          </FormField>
                          <FormField label={t('contact:modalBusiness.fields.role.label')} required error={errors.role?.message}>
                            <InputSelect registration={register('role')} placeholder={t('contact:modalBusiness.fields.role.placeholder')} options={ROLE_OPTIONS} error={!!errors.role} autoComplete="organization-title" />
                          </FormField>
                          {watch('role') === 'Other' && (
                            <FormField label={t('contact:modalBusiness.fields.roleOther.label')} error={errors.roleOther?.message}>
                              <InputText registration={register('roleOther')} placeholder={t('contact:modalBusiness.fields.roleOther.placeholder')} error={!!errors.roleOther} value={watch('roleOther')} autoComplete="organization-title" />
                            </FormField>
                          )}
                          <FormField label={t('contact:modalBusiness.fields.country.label')} required error={errors.country?.message}>
                            <InputSelect registration={register('country')} placeholder={t('contact:modalBusiness.fields.country.placeholder')} options={COUNTRY_OPTIONS} error={!!errors.country} autoComplete="country-name" />
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
                            label={t('contact:modalBusiness.inquiryOptions.specific')}
                            error={!!fieldErrors.inquiryType}
                            value="specific"
                            type="radio"
                          />
                          <InputCheckbox
                            registration={register('inquiryType')}
                            checked={inquiryType === 'general'}
                            label={t('contact:modalBusiness.inquiryOptions.general')}
                            error={!!fieldErrors.inquiryType}
                            value="general"
                            type="radio"
                          />
                        </>
                      )}

                      {/* STEP 3 — Project specs */}
                      {currentStep === 2 && (
                        <>
                          <FormField label={t('contact:modalBusiness.fields.projectCategory.label')} required error={errors.projectCategory?.message}>
                            <InputSelect registration={register('projectCategory')} placeholder={t('contact:modalBusiness.fields.projectCategory.placeholder')} options={CATEGORY_OPTIONS} error={!!errors.projectCategory} />
                          </FormField>
                          {watch('projectCategory') === 'Other' && (
                            <FormField label={t('contact:modalBusiness.fields.projectCategoryOther.label')} error={errors.projectCategoryOther?.message}>
                              <InputText registration={register('projectCategoryOther')} placeholder={t('contact:modalBusiness.fields.projectCategoryOther.placeholder')} error={!!errors.projectCategoryOther} value={watch('projectCategoryOther')} />
                            </FormField>
                          )}
                          <FormField label={t('contact:modalBusiness.fields.industry.label')} error={errors.industry?.message}>
                            <InputText registration={register('industry')} placeholder={t('contact:modalBusiness.fields.industry.placeholder')} error={!!errors.industry} value={watch('industry')} />
                          </FormField>
                          <FormField label={t('contact:modalBusiness.fields.budget.label')} required error={errors.budget?.message}>
                            <InputSelect registration={register('budget')} placeholder={t('contact:modalBusiness.fields.budget.placeholder')} options={BUDGET_OPTIONS} error={!!errors.budget} />
                          </FormField>
                          <FormField label={t('contact:modalBusiness.fields.targetDeadline.label')} error={errors.targetDeadline?.message}>
                            <InputSelect registration={register('targetDeadline')} placeholder={t('contact:modalBusiness.fields.targetDeadline.placeholder')} options={DEADLINE_OPTIONS} error={!!errors.targetDeadline} />
                          </FormField>
                          {watch('targetDeadline') === 'Other' && (
                            <FormField label={t('contact:modalBusiness.fields.targetDeadlineOther.label')} error={errors.targetDeadlineOther?.message}>
                              <InputText registration={register('targetDeadlineOther')} type="date" error={!!errors.targetDeadlineOther} value={watch('targetDeadlineOther')} />
                            </FormField>
                          )}
                          <FormField label={t('contact:modalBusiness.fields.startDate.label')} required error={errors.startDate?.message}>
                            <InputSelect registration={register('startDate')} placeholder={t('contact:modalBusiness.fields.startDate.placeholder')} options={START_DATE_OPTIONS} error={!!errors.startDate} />
                          </FormField>
                        </>
                      )}

                      {/* STEP 4 — Message */}
                      {currentStep === 3 && (
                        <>
                          <FormField label={t('contact:modalBusiness.fields.message.label')} required error={errors.message?.message}>
                            <InputTextarea
                              registration={register('message')}
                              placeholder={t('contact:modalBusiness.fields.message.placeholder')}
                              maxLength={3000}
                              watchValue={messageValue}
                              rows={7}
                              error={!!errors.message}
                            />
                          </FormField>

                          {/* File attachment */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <label className="text-s" style={{ color: 'var(--color-neutral-400)' }}>
                              {t('contact:modalBusiness.fields.attachBrief.label')} <span className="text-xs" style={{ color: 'var(--color-neutral-600)' }}>{t('contact:modalBusiness.fields.attachBrief.hint')}</span>
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
                                <span className="text-s" style={{ color: 'var(--color-neutral-500)' }}>{t('contact:modalBusiness.fields.attachBrief.uploadCta')}</span>
                                <input type="file" accept="application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} style={{ display: 'none' }} />
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

                          <FormField label={t('contact:modalBusiness.fields.externalLinks.label')} error={errors.externalLinks?.message}>
                            <InputText registration={register('externalLinks')} type="url" placeholder={t('contact:modalBusiness.fields.externalLinks.placeholder')} error={!!errors.externalLinks} value={watch('externalLinks')} />
                          </FormField>
                          <FormField label={t('contact:modalBusiness.fields.source.label')} required error={errors.source?.message || fieldErrors.source}>
                            <InputSelect registration={register('source')} placeholder={t('contact:modalBusiness.fields.source.placeholder')} options={SOURCE_OPTIONS} error={!!errors.source || !!fieldErrors.source} />
                          </FormField>
                          {watch('source') === 'Other' && (
                            <FormField label={t('contact:modalBusiness.fields.sourceOther.label')} error={errors.sourceOther?.message}>
                              <InputText registration={register('sourceOther')} placeholder={t('contact:modalBusiness.fields.sourceOther.placeholder')} error={!!errors.sourceOther} value={watch('sourceOther')} />
                            </FormField>
                          )}
                          <InputCheckbox
                            registration={register('ndaRequested')}
                            checked={!!ndaChecked}
                            label={t('contact:modalBusiness.fields.ndaRequested.label')}
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
                      <Btn variant="secondary" as="button" type="button" size="md" onClick={handleBack} active={false} disabled={currentStep === 0}>{t('common:buttons.back')}</Btn>
                      {currentStep < 3
                        ? <Btn variant="accept" as="button" type="button" onClick={handleNext} disabled={!isStepValid}>{t('common:buttons.next')}</Btn>
                        : <Btn variant="accept" as="button" type="button" onClick={handleSubmitForm} disabled={!isStepValid || isSubmitting}>{isSubmitting ? t('common:buttons.sending') : t('common:buttons.submit')}</Btn>
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
