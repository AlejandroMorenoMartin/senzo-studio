interface FormStepperProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
  skippedSteps?: number[];
  onStepClick: (index: number) => void;
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6l3 3 5-6" stroke="#060000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function FormStepper({ steps, currentStep, completedSteps, skippedSteps = [], onStepClick }: FormStepperProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-7)' }}>
      {steps.map((step, i) => {
        const isCompleted = completedSteps.includes(i);
        const isCurrent = currentStep === i;
        const isSkipped = skippedSteps.includes(i);
        const isClickable = isCompleted;

        return (
          <button
            key={i}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && onStepClick(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: isClickable ? 'pointer' : 'default',
              textAlign: 'left',
            }}
          >
            {/* Circle */}
            <span style={{
              flexShrink: 0,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: isCompleted
                ? 'none'
                : isCurrent
                ? '0.5px solid var(--color-neutral-400)'
                : '0.5px solid var(--color-neutral-800)',
              background: isCompleted
                ? isSkipped ? 'var(--color-neutral-800)' : 'var(--color-green)'
                : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background var(--transition-hover), border-color var(--transition-hover)',
            }}>
              {isCompleted && !isSkipped
                ? <CheckIcon />
                : <span className="text-xs" style={{
                    color: isCurrent ? 'var(--color-neutral-100)' : 'var(--color-neutral-600)',
                    fontWeight: isCurrent ? 500 : 300,
                  }}>
                    {i + 1}
                  </span>
              }
            </span>
            {/* Label */}
            <span className="text-s" style={{
              color: isCompleted
                ? 'var(--color-neutral-400)'
                : isCurrent
                ? 'var(--color-neutral-100)'
                : 'var(--color-neutral-600)',
            }}>
              {step}
            </span>
          </button>
        );
      })}
    </div>
  );
}
