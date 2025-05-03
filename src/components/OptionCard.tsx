
import React, { useState, MouseEvent } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import QuantitySelector from './QuantitySelector';

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
  hasQuantity?: boolean;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  price,
  isSelected,
  onClick,
  nestedOptions,
  selectedNestedOption,
  onNestedOptionSelect,
  hasQuantity = false,
  quantity = 1,
  onQuantityChange
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

  const handleNestedOptionClick = (e: MouseEvent, optionId: string) => {
    e.stopPropagation();
    if (onNestedOptionSelect) {
      onNestedOptionSelect(optionId);
    }
  };

  const handleIncrease = (e: MouseEvent) => {
    e.stopPropagation();
    if (onQuantityChange && quantity < 10) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrease = (e: MouseEvent) => {
    e.stopPropagation();
    if (onQuantityChange && quantity > 1) {
      onQuantityChange(quantity - 1);
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
        
        <h4 className="text-base font-medium mb-1 font-pretendard">{title}</h4>
        <div className="text-sm text-merrymoment-brown font-pretendard">
          {price.toLocaleString()}원
        </div>
        
        {isSelected && hasQuantity && onQuantityChange && !nestedOptions && (
          <QuantitySelector
            quantity={quantity}
            onIncrease={(e) => handleIncrease(e as unknown as MouseEvent)}
            onDecrease={(e) => handleDecrease(e as unknown as MouseEvent)}
          />
        )}
      </div>

      {/* Nested options dropdown */}
      {isSelected && isExpanded && nestedOptions && nestedOptions.length > 0 && (
        <div className="mt-2 pl-2 border-l-2 border-merrymoment-beige">
          {nestedOptions.map(option => (
            <div 
              key={option.id}
              onClick={(e) => handleNestedOptionClick(e, option.id)}
              className={cn(
                "py-2 px-3 mb-1 rounded-md cursor-pointer flex justify-between items-center text-sm font-pretendard",
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
          
          {selectedNestedOption && onQuantityChange && (
            <div className="mt-2 px-3" onClick={(e) => e.stopPropagation()}>
              <QuantitySelector
                label="수량"
                quantity={quantity}
                onIncrease={() => onQuantityChange(quantity + 1)}
                onDecrease={() => onQuantityChange(quantity - 1)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionCard;
