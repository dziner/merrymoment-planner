
import React from 'react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                index < currentStep
                  ? "bg-merrymoment-brown text-white" // Completed step
                  : index === currentStep
                  ? "bg-merrymoment-darkbrown text-white ring-2 ring-merrymoment-brown" // Current step - made more prominent
                  : "bg-merrymoment-cream border border-merrymoment-beige text-merrymoment-brown" // Future step
              )}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1 text-center max-w-[60px] font-pretendard">{step}</span>
          </div>
        ))}
      </div>
      
      <div className="flex h-1 bg-merrymoment-cream">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex-1",
              index < currentStep
                ? "bg-merrymoment-brown" // Completed step
                : index === currentStep
                ? "bg-merrymoment-darkbrown" // Current step
                : "bg-merrymoment-beige" // Future step
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
