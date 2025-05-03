
import React from 'react';

interface OptionSummary {
  title: string;
  quantity?: number;
  nestedOption?: string;
  price: number;
}

interface PriceCalculatorProps {
  basePrice: number;
  optionsTotal: number;
  selectedOptions?: OptionSummary[];
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  basePrice,
  optionsTotal,
  selectedOptions = [],
}) => {
  const totalPrice = basePrice + optionsTotal;
  
  return (
    <div className="bg-merrymoment-cream border border-merrymoment-beige rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-merrymoment-brown font-pretendard">패키지 가격:</span>
        <span className="font-pretendard">{basePrice.toLocaleString()}원</span>
      </div>
      
      {selectedOptions.length > 0 && (
        <div className="mb-3">
          <span className="text-merrymoment-brown font-pretendard mb-1 block">추가 옵션:</span>
          <ul className="text-sm space-y-1 pl-2">
            {selectedOptions.map((option, index) => (
              <li key={index} className="flex justify-between font-pretendard">
                <span>
                  {option.title}
                  {option.quantity && option.quantity > 1 ? ` (${option.quantity}개)` : ''}
                  {option.nestedOption ? ` - ${option.nestedOption}` : ''}
                </span>
                <span>{option.price.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-merrymoment-brown font-pretendard">추가 옵션 합계:</span>
        <span className="font-pretendard">{optionsTotal.toLocaleString()}원</span>
      </div>
      
      <div className="border-t border-merrymoment-beige my-3"></div>
      
      <div className="flex justify-between items-center">
        <span className="text-lg text-merrymoment-darkbrown font-medium font-pretendard">총 금액:</span>
        <span className="text-xl font-medium font-pretendard">{totalPrice.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default PriceCalculator;
