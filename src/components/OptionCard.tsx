
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NestedOption {
  id: string;
  title: string;
  price: number;
}

interface OptionCardProps {
  title: string;
  price: number;
  isSelected: boolean;
  onClick: () => void;
  nestedOptions?: NestedOption[];
  selectedNestedOption?: string | null;
  onNestedOptionSelect?: (optionId: string) => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  price,
  isSelected,
  onClick,
  nestedOptions,
  selectedNestedOption,
  onNestedOptionSelect
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (nestedOptions && nestedOptions.length > 0) {
      if (!isSelected) {
        onClick();
        setIsExpanded(true);
      } else {
        setIsExpanded(!isExpanded);
      }
    } else {
      onClick();
    }
  };

  const handleNestedOptionClick = (e: React.MouseEvent, optionId: string) => {
    e.stopPropagation();
    if (onNestedOptionSelect) {
      onNestedOptionSelect(optionId);
    }
  };

  return (
    <div className="flex flex-col">
      <div 
        className={cn("option-card", isSelected && "selected")}
        onClick={handleClick}
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

      {/* Nested options dropdown */}
      {isSelected && isExpanded && nestedOptions && nestedOptions.length > 0 && (
        <div className="mt-2 pl-2 border-l-2 border-merrymoment-beige">
          {nestedOptions.map(option => (
            <div 
              key={option.id}
              onClick={(e) => handleNestedOptionClick(e, option.id)}
              className={cn(
                "py-2 px-3 mb-1 rounded-md cursor-pointer flex justify-between items-center text-sm",
                selectedNestedOption === option.id 
                  ? "bg-merrymoment-beige text-merrymoment-darkbrown"
                  : "bg-merrymoment-cream hover:bg-merrymoment-beige/30"
              )}
            >
              <span>{option.title}</span>
              {selectedNestedOption === option.id && (
                <Check className="h-3 w-3 text-merrymoment-darkbrown" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionCard;
