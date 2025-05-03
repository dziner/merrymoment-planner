
import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity = 10,
}) => {
  return (
    <div className="quantity-control">
      <button 
        type="button"
        className="quantity-button" 
        onClick={onDecrease}
        disabled={quantity <= minQuantity}
      >
        <Minus className="h-3 w-3" />
      </button>
      <div className="quantity-display">
        {quantity}
      </div>
      <button 
        type="button"
        className="quantity-button" 
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
};

export default QuantitySelector;
