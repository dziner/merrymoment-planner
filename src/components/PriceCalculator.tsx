
import React from 'react';

interface PriceCalculatorProps {
  basePrice: number;
  optionsTotal: number;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  basePrice,
  optionsTotal,
}) => {
  const totalPrice = basePrice + optionsTotal;
  
  return (
    <div className="bg-merrymoment-cream border border-merrymoment-beige rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-merrymoment-brown font-pretendard">패키지 가격:</span>
        <span className="font-pretendard">{basePrice.toLocaleString()}원</span>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-merrymoment-brown font-pretendard">추가 옵션:</span>
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
