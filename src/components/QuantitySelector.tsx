
import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: (e?: React.MouseEvent) => void;
  onDecrease: (e?: React.MouseEvent) => void;
  minQuantity?: number;
  maxQuantity?: number;
  label?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity = 10,
  label
}) => {
  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onIncrease(e);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onDecrease(e);
  };

  return (
    <div className="flex flex-col space-y-1 mt-2">
      {label && <p className="text-xs text-merrymoment-brown font-pretendard">{label}</p>}
      <div className="quantity-control">
        <button 
          type="button"
          className="quantity-button" 
          onClick={handleDecrease}
          disabled={quantity <= minQuantity}
        >
          <Minus className="h-3 w-3" />
        </button>
        <div className="quantity-display font-pretendard">
          {quantity}
        </div>
        <button 
          type="button"
          className="quantity-button" 
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity}
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
