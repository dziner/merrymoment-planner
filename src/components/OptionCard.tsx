
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionCardProps {
  title: string;
  price: number;
  isSelected: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  price,
  isSelected,
  onClick
}) => {
  return (
    <div 
      className={cn("option-card", isSelected && "selected")}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-merrymoment-brown rounded-full p-1">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
      
      <h4 className="text-base font-medium mb-1">{title}</h4>
      <div className="text-sm text-merrymoment-brown">
        {price.toLocaleString()}원
      </div>
    </div>
  );
};

export default OptionCard;
