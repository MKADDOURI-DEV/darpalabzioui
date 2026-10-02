import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
}

interface BookingStepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function BookingStepIndicator({ steps, currentStep }: BookingStepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, idx) => (
        <React.Fragment key={`step-${step.number}`}>
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step.number < currentStep
                  ? 'bg-deep-green text-ivory'
                  : step.number === currentStep
                  ? 'bg-terracotta text-ivory shadow-warm-md'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.number < currentStep ? <Check size={16} /> : step.number}
            </div>
            <span
              className={`text-xs mt-1.5 font-medium hidden sm:block ${
                step.number === currentStep ? 'text-terracotta' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-2 transition-colors duration-300 ${
                step.number < currentStep ? 'bg-deep-green' : 'bg-border'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}