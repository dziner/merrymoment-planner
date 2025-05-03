
import React from 'react';
import { cn } from '@/lib/utils';

interface WeekdayToggleProps {
  isWeekend: boolean;
  onChange: (isWeekend: boolean) => void;
}

const WeekdayToggle: React.FC<WeekdayToggleProps> = ({ isWeekend, onChange }) => {
  return (
    <div className="flex border border-merrymoment-beige rounded-md overflow-hidden">
      <button
        onClick={() => onChange(false)}
        className={cn(
          "flex-1 py-2 px-4 text-sm transition-colors duration-200",
          !isWeekend 
            ? "bg-merrymoment-brown text-white" 
            : "bg-merrymoment-cream text-merrymoment-brown"
        )}
      >
        평일
      </button>
      <button
        onClick={() => onChange(true)}
        className={cn(
          "flex-1 py-2 px-4 text-sm transition-colors duration-200",
          isWeekend 
            ? "bg-merrymoment-brown text-white" 
            : "bg-merrymoment-cream text-merrymoment-brown"
        )}
      >
        주말
      </button>
    </div>
  );
};

export default WeekdayToggle;
