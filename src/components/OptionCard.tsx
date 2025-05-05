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

        {isSelected && hasQuantity && !nestedOptions && (
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        )}
      </div>

      {isSelected && nestedOptions && isExpanded && (
        <div className="mt-2 ml-2 flex flex-col gap-2">
          {nestedOptions.map((nested) => {
            const nestedQuantity = selectedNestedOptions?.[nested.id] || 0;
            return (
              <div
                key={nested.id}
                className="border p-2 rounded cursor-pointer hover:bg-gray-100"
                onClick={(e) => handleNestedOptionClick(e, nested.id)}
              >
                <div className="flex justify-between items-center font-pretendard">
                  <span>{nested.title}</span>
                  <span className="text-sm text-gray-600">{nested.price.toLocaleString()}원</span>
                </div>
                {nestedQuantity > 0 && (
                  <QuantitySelector
                    quantity={nestedQuantity}
                    onIncrease={(e) => {
                      e?.stopPropagation();
                      handleNestedQuantityChange(nested.id, nestedQuantity + 1);
                    }}
                    onDecrease={(e) => {
                      e?.stopPropagation();
                      handleNestedQuantityChange(nested.id, nestedQuantity - 1);
                    }}
                  />
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
