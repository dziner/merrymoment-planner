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
  selectedNestedOptions?: Record<string, number> | null;
  onNestedOptionSelect?: (optionId: string, quantity: number) => void;
  onNestedOptionClear?: () => void;
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
  selectedNestedOptions,
  onNestedOptionSelect,
  onNestedOptionClear,
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
        // Toggle the selection off if already selected
        if (onNestedOptionClear) {
          onNestedOptionClear();
        }
        onClick();
        setIsExpanded(false);
      }
    } else {
      onClick();
    }
  };

  const handleNestedOptionClick = (e: MouseEvent, optionId: string) => {
    e.stopPropagation();
    if (onNestedOptionSelect) {
      const currentQuantity = selectedNestedOptions?.[optionId] || 0;
      // Initialize with 1 if not already selected, otherwise keep current quantity
      const newQuantity = currentQuantity === 0 ? 1 : currentQuantity;
      onNestedOptionSelect(optionId, newQuantity);
    }
  };

  const handleNestedQuantityChange = (optionId: string, newQuantity: number) => {
    if (onNestedOptionSelect) {
      onNestedOptionSelect(optionId, newQuantity);
    }
  };

  const handleIncrease = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (onQuantityChange && quantity < 10) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrease = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (onQuantityChange && quantity > 0) {
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
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            minQuantity={0}
          />
        )}
      </div>

      {/* Nested options dropdown */}
      {isSelected && isExpanded && nestedOptions && nestedOptions.length > 0 && (
        <div className="mt-2 pl-2 border-l-2 border-merrymoment-beige">
          {nestedOptions.map(option => {
            const isNestedSelected = selectedNestedOptions && selectedNestedOptions[option.id] > 0;
            const nestedQuantity = selectedNestedOptions?.[option.id] || 0;
            
            return (
              <div key={option.id} className="mb-2">
                <div 
                  onClick={(e) => handleNestedOptionClick(e, option.id)}
                  className={cn(
                    "py-2 px-3 mb-1 rounded-md cursor-pointer flex justify-between items-center text-sm font-pretendard",
                    isNestedSelected
                      ? "bg-merrymoment-beige text-merrymoment-darkbrown"
                      : "bg-merrymoment-cream hover:bg-merrymoment-beige/30"
                  )}
                >
                  <span>{option.title}</span>
                  {isNestedSelected && (
                    <Check className="h-3 w-3 text-merrymoment-darkbrown" />
                  )}
                </div>
                
                {isNestedSelected && (
                  <div className="mt-1 px-3" onClick={(e) => e.stopPropagation()}>
                    <QuantitySelector
                      label="수량"
                      quantity={nestedQuantity}
                      onIncrease={(e) => { 
                        e?.stopPropagation();
                        handleNestedQuantityChange(option.id, nestedQuantity + 1);
                      }}
                      onDecrease={(e) => {
                        e?.stopPropagation();
                        handleNestedQuantityChange(option.id, nestedQuantity - 1);
                      }}
                      minQuantity={0}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OptionCard;
