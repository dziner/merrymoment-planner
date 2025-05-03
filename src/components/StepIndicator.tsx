
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
                  ? "bg-merrymoment-brown text-white"
                  : index === currentStep
                  ? "bg-merrymoment-beige text-merrymoment-darkbrown"
                  : "bg-merrymoment-cream border border-merrymoment-beige text-merrymoment-brown"
              )}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1 text-center max-w-[60px]">{step}</span>
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
                ? "bg-merrymoment-brown"
                : "bg-merrymoment-beige"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
