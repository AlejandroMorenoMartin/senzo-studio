import { useEffect, useRef, useState } from 'react';
import { useForm, Controller, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BtnIcon from './BtnIcon';
import Btn from './Btn';
import Callout from './Callout';
import FormField from './form/FormField';
import InputText from './form/InputText';
import InputSelect from './form/InputSelect';
import InputCheckbox from './form/InputCheckbox';
import InputTextarea from './form/InputTextarea';
import FormStepper from './form/FormStepper';
import { COUNTRY_OPTIONS } from '../data/countries';

interface ModalFreelancerProps {
  isOpen: boolean;
  onClose: () => void;
  onPrivacyClick: () => void;
}

// STEPS and stepTitles are initialized inside component using useTranslation

const DEPARTMENT_OPTIONS = [
  { value: 'FX', label: 'FX' },
  { value: 'CFX', label: 'CFX' },
  { value: 'Lighting', label: 'Lighting' },
  { value: 'Render', label: 'Render' },
  { value: 'Compositing', label: 'Compositing' },
  { value: '3D Animation', label: '3D Animation' },
  { value: '3D Modeling', label: '3D Modeling' },
  { value: 'Texturing', label: 'Texturing' },
  { value: 'Tracking', label: 'Tracking' },
  { value: 'Match-Move', label: 'Match-Move' },
  { value: 'Rotoscope', label: 'Rotoscope' },
  { value: 'Keying', label: 'Keying' },
  { value: 'Paint-Prep', label: 'Paint-Prep' },
  { value: 'Other', label: 'Other' },
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


const step1Schema = z.object({
  firstName: z.string().min(1, 'Enter your first name'),
  lastName: z.string().min(1, 'Enter your last name'),
  email: z.string()
    .min(1, 'Enter your email address')
    .email('Enter a valid email address (e.g. name@email.com)'),
  country: z.string().min(1, 'Select your country'),
});

const step2Schema = z.object({
  department: z.array(z.string()).min(1, 'Select at least one department'),
  departmentOther: z.string().optional(),
  mainSoftware: z.string().min(1, 'List your main software (e.g. Houdini, Nuke, Maya)'),
  yearsExperience: z.string().min(1, 'Enter your years of experience'),
  expectedRate: z.string().min(1, 'Enter your expected daily or hourly rate'),
  availability: z.string().min(1, 'Select your availability'),
}).refine(
  (data) => !data.department.includes('Other') || (data.departmentOther && data.departmentOther.trim().length > 0),
  { message: 'Please specify your department', path: ['departmentOther'] }
);

const optionalHttpsUrl = z.string().optional().refine((v) => !v || /^https:\/\/.+\..+/.test(v), 'Enter a valid https URL');

const step3Schema = z.object({
  reelLink: z.string()
    .min(1, 'Enter your reel URL')
    .refine((v) => /^https:\/\/.+\..+/.test(v), 'Enter a valid https URL (e.g. https://vimeo.com/youreel)'),
  reelPassword: z.string().optional(),
  websiteUrl: optionalHttpsUrl,
  otherLinks: optionalHttpsUrl,
});

const step4Schema = z.object({
  source: z.string().min(1, 'Let us know how you found us'),
  sourceOther: z.string().optional(),
  message: z.string().optional(),
  privacyPolicy: z.boolean().refine((v) => v === true, 'You must accept the Privacy Policy to continue'),
});

const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema];

const fullSchema = z.object({
  firstName: z.string().min(1, 'Enter your first name'),
  lastName: z.string().min(1, 'Enter your last name'),
  email: z.string().min(1, 'Enter your email address').email('Enter a valid email address (e.g. name@email.com)'),
  country: z.string().min(1, 'Select your country'),
  department: z.array(z.string()).optional(),
  departmentOther: z.string().optional(),
  mainSoftware: z.string().optional(),
  yearsExperience: z.string().optional(),
  expectedRate: z.string().optional(),
  availability: z.string().optional(),
  reelLink: z.string().optional().refine((v) => !v || /^https:\/\/.+\..+/.test(v), 'Enter a valid https URL (e.g. https://vimeo.com/youreel)'),
  reelPassword: z.string().optional(),
  websiteUrl: optionalHttpsUrl,

  otherLinks: optionalHttpsUrl,
  source: z.string().optional(),
  sourceOther: z.string().optional(),
  message: z.string().optional(),
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
              {t('contact:modalFreelancer.fields.privacyPolicy.label')}{' '}
              <button type="button" onClick={onPrivacyClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px', font: 'inherit' }}>
                {t('contact:modalFreelancer.fields.privacyPolicy.linkLabel')}
              </button>
            </span>
          </label>
        );
      }}
    />
  );
}

export default function ModalFreelancer({ isOpen, onClose, onPrivacyClick }: ModalFreelancerProps) {
  const { t } = useTranslation(['contact', 'common']);
  const STEPS = t('contact:modalFreelancer.steps', { returnObjects: true }) as string[];
  const stepTitles = t('contact:modalFreelancer.stepTitles', { returnObjects: true }) as string[];
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SESSION_KEY = 'senzo_freelancer_form';

  const savedSession = useRef((() => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? 'null'); } catch { return null; }
  })()).current;

  const { register, watch, reset, getValues, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: savedSession?.values ?? {
      firstName: '', lastName: '', email: '', country: '',
      department: [], departmentOther: '', mainSoftware: '', yearsExperience: '', expectedRate: '', availability: '',
      reelLink: '', reelPassword: '', websiteUrl: '', otherLinks: '',
      source: '', sourceOther: '', message: '', privacyPolicy: false, honeypot: '',
    },
  });

  const watchedValues = watch();
  const messageValue = watchedValues.message ?? '';
  const selectedDepartments = watchedValues.department ?? [];

  const isStepValid = stepSchemas[currentStep].safeParse(watchedValues).success;

  // Restore step from session on first open
  useEffect(() => {
    if (!isOpen || !savedSession) return;
    if (savedSession.step) setCurrentStep(savedSession.step);
    if (savedSession.completedSteps) setCompletedSteps(savedSession.completedSteps);
  }, [isOpen]);

  // Persist form state to sessionStorage on every change
  useEffect(() => {
    const sub = watch((values) => {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        values,
        step: currentStep,
        completedSteps,
      }));
    });
    return () => sub.unsubscribe();
  }, [watch, currentStep, completedSteps]);

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
    if (submitted) {
      setTimeout(() => {
        setCurrentStep(0);
        setCompletedSteps([]);
        setFieldErrors({});
        setSubmitted(false);
        setSubmitError('');
        reset();
      }, 300);
    }
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
      sessionStorage.removeItem(SESSION_KEY);
      setSubmitted(true);
    } catch {
      setSubmitError(t('contact:modalFreelancer.errors.submitGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
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
              <h2 className="title-l">{t('contact:modalFreelancer.title')}</h2>
              <BtnIcon as="button" variant="outline" label={t('common:buttons.close')} onClick={handleClose} style={{ flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </BtnIcon>
            </div>
            {!submitted && (
              <p className="text-base" style={{ marginBottom: 'var(--space-5)' }}>
                {t('contact:modalFreelancer.intro')}
              </p>
            )}
            {!submitted && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <Callout>
                  <p className="text-s">{t('contact:modalFreelancer.callout')}</p>
                </Callout>
              </div>
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
                      {t('contact:modalFreelancer.success')}
                    </p>
                    <Btn variant="accept" as="button" onClick={handleClose}>{t('common:buttons.accept')}</Btn>
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
                          <FormField label={t('contact:modalFreelancer.fields.firstName.label')} required error={errors.firstName?.message ?? fieldErrors.firstName}>
                            <InputText registration={register('firstName')} placeholder={t('contact:modalFreelancer.fields.firstName.placeholder')} error={!!errors.firstName || !!fieldErrors.firstName} value={watch('firstName')} autoComplete="name" />
                          </FormField>
                          <FormField label={t('contact:modalFreelancer.fields.lastName.label')} required error={errors.lastName?.message ?? fieldErrors.lastName}>
                            <InputText registration={register('lastName')} placeholder={t('contact:modalFreelancer.fields.lastName.placeholder')} error={!!errors.lastName || !!fieldErrors.lastName} value={watch('lastName')} autoComplete="family-name" />
                          </FormField>
                          <FormField label={t('contact:modalFreelancer.fields.email.label')} required error={errors.email?.message ?? fieldErrors.email}>
                            <InputText registration={register('email')} type="email" placeholder={t('contact:modalFreelancer.fields.email.placeholder')} error={!!errors.email || !!fieldErrors.email} value={watch('email')} autoComplete="email" />
                          </FormField>
                          <FormField label={t('contact:modalFreelancer.fields.country.label')} required error={errors.country?.message ?? fieldErrors.country}>
                            <InputSelect registration={register('country')} placeholder={t('contact:modalFreelancer.fields.country.placeholder')} options={COUNTRY_OPTIONS} error={!!errors.country || !!fieldErrors.country} autoComplete="country-name" />
                          </FormField>
                        </>
                      )}

                      {currentStep === 1 && (
                        <>
                          <FormField label={t('contact:modalFreelancer.fields.department.label')} required error={fieldErrors.department}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(7, auto)', gridAutoFlow: 'column', gap: 'var(--space-4)' }}>
                              {DEPARTMENT_OPTIONS.map((opt) => (
                                <InputCheckbox
                                  key={opt.value}
                                  registration={register('department')}
                                  label={opt.label}
                                  checked={selectedDepartments.includes(opt.value)}
                                  value={opt.value}
                                />
                              ))}
                            </div>
                          </FormField>
                          {selectedDepartments.includes('Other') && (
                            <FormField label={t('contact:modalFreelancer.fields.departmentOther.label')} required error={fieldErrors.departmentOther}>
                              <InputText registration={register('departmentOther')} placeholder={t('contact:modalFreelancer.fields.departmentOther.placeholder')} error={!!fieldErrors.departmentOther} value={watch('departmentOther')} autoComplete="off" />
                            </FormField>
                          )}
                          <FormField label={t('contact:modalFreelancer.fields.mainSoftware.label')} required error={fieldErrors.mainSoftware}>
                            <InputText registration={register('mainSoftware')} placeholder={t('contact:modalFreelancer.fields.mainSoftware.placeholder')} error={!!fieldErrors.mainSoftware} value={watch('mainSoftware')} autoComplete="off" />
                          </FormField>
                          <FormField label={t('contact:modalFreelancer.fields.yearsExperience.label')} required error={fieldErrors.yearsExperience}>
                            <InputText registration={register('yearsExperience')} type="number" placeholder={t('contact:modalFreelancer.fields.yearsExperience.placeholder')} error={!!fieldErrors.yearsExperience} value={watch('yearsExperience')} autoComplete="off" />
                          </FormField>
                          <FormField label={t('contact:modalFreelancer.fields.expectedRate.label')} required error={fieldErrors.expectedRate}>
                            <InputText registration={register('expectedRate')} type="number" placeholder={t('contact:modalFreelancer.fields.expectedRate.placeholder')} error={!!fieldErrors.expectedRate} value={watch('expectedRate')} autoComplete="off" />
                          </FormField>
                          <FormField label={t('contact:modalFreelancer.fields.availability.label')} required error={fieldErrors.availability}>
                            <InputText registration={register('availability')} placeholder={t('contact:modalFreelancer.fields.availability.placeholder')} error={!!fieldErrors.availability} value={watch('availability')} autoComplete="off" />
                          </FormField>
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <FormField label={t('contact:modalFreelancer.fields.reelLink.label')} required error={errors.reelLink?.message ?? fieldErrors.reelLink}>
                            <InputText registration={register('reelLink')} type="url" placeholder={t('contact:modalFreelancer.fields.reelLink.placeholder')} error={!!errors.reelLink || !!fieldErrors.reelLink} value={watch('reelLink')} autoComplete="off" />
                          </FormField>
                          <FormField label={t('contact:modalFreelancer.fields.reelPassword.label')} error={fieldErrors.reelPassword}>
                            <InputText registration={register('reelPassword')} placeholder={t('contact:modalFreelancer.fields.reelPassword.placeholder')} error={!!fieldErrors.reelPassword} value={watch('reelPassword')} autoComplete="off" />
                          </FormField>
                          <FormField label={t('contact:modalFreelancer.fields.websiteUrl.label')} error={errors.websiteUrl?.message ?? fieldErrors.websiteUrl}>
                            <InputText registration={register('websiteUrl')} type="url" placeholder={t('contact:modalFreelancer.fields.websiteUrl.placeholder')} error={!!errors.websiteUrl || !!fieldErrors.websiteUrl} value={watch('websiteUrl')} autoComplete="url" />
                          </FormField>
                          <FormField label={t('contact:modalFreelancer.fields.otherLinks.label')} error={errors.otherLinks?.message ?? fieldErrors.otherLinks}>
                            <InputText registration={register('otherLinks')} type="url" placeholder={t('contact:modalFreelancer.fields.otherLinks.placeholder')} error={!!errors.otherLinks || !!fieldErrors.otherLinks} value={watch('otherLinks')} autoComplete="off" />
                          </FormField>
                        </>
                      )}

                      {currentStep === 3 && (
                        <>
                          <FormField label={t('contact:modalFreelancer.fields.source.label')} required error={fieldErrors.source}>
                            <InputSelect registration={register('source')} placeholder={t('contact:modalFreelancer.fields.source.placeholder')} options={SOURCE_OPTIONS} error={!!fieldErrors.source} />
                          </FormField>
                          {watch('source') === 'Other' && (
                            <FormField label={t('contact:modalFreelancer.fields.sourceOther.label')} error={fieldErrors.sourceOther}>
                              <InputText registration={register('sourceOther')} placeholder={t('contact:modalFreelancer.fields.sourceOther.placeholder')} error={!!fieldErrors.sourceOther} value={watch('sourceOther')} />
                            </FormField>
                          )}
                          <FormField label={t('contact:modalFreelancer.fields.message.label')} error={fieldErrors.message}>
                            <InputTextarea registration={register('message')} placeholder={t('contact:modalFreelancer.fields.message.placeholder')} watchValue={messageValue} rows={5} />
                          </FormField>

                          <PrivacyCheckbox
                            control={control}
                            error={!!fieldErrors.privacyPolicy}
                            onPrivacyClick={onPrivacyClick}
                          />
                          {fieldErrors.privacyPolicy && (
                            <p className="text-xs" style={{ color: 'var(--color-input-error)' }}>{fieldErrors.privacyPolicy}</p>
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
