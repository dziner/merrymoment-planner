
import React from 'react';
import { Button } from '@/components/ui/button';
import PriceCalculator from '@/components/PriceCalculator';

interface BookingSummaryProps {
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  selectedPackage: string | null;
  packageData: any;
  isWeekend: boolean;
  getBasePrice: () => number;
  getOptionsTotal: () => number;
  getOptionsSummary: () => any[];
  handleExternalBooking: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  contactInfo,
  selectedPackage,
  packageData,
  isWeekend,
  getBasePrice,
  getOptionsTotal,
  getOptionsSummary,
  handleExternalBooking
}) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-brandon text-merrymoment-darkbrown mb-2">
          예약 완료
        </h2>
        <p className="text-merrymoment-brown font-pretendard">
          아래 내용을 확인하시고 예약을 진행해주세요.
        </p>
      </div>
      
      <div className="border border-merrymoment-beige rounded-md p-5 mb-6">
        <h3 className="font-medium text-lg mb-3 text-merrymoment-darkbrown font-pretendard">예약 정보</h3>
        
        <div className="space-y-3 text-sm font-pretendard">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-merrymoment-brown">이름:</span>
            <span className="col-span-2">{contactInfo.name}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <span className="text-merrymoment-brown">연락처:</span>
            <span className="col-span-2">{contactInfo.phone}</span>
          </div>
          
          {contactInfo.email && (
            <div className="grid grid-cols-3 gap-2">
              <span className="text-merrymoment-brown">이메일:</span>
              <span className="col-span-2">{contactInfo.email}</span>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-2">
            <span className="text-merrymoment-brown">패키지:</span>
            <span className="col-span-2">
              {selectedPackage && packageData[selectedPackage] 
                ? packageData[selectedPackage].title 
                : ''}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <span className="text-merrymoment-brown">촬영 요일:</span>
            <span className="col-span-2">{isWeekend ? '주말' : '평일'}</span>
          </div>
          
          {getOptionsSummary().length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              <span className="text-merrymoment-brown">추가 옵션:</span>
              <div className="col-span-2">
                <ul className="list-disc pl-5 space-y-1">
                  {getOptionsSummary().map((option, index) => (
                    <li key={index}>
                      {option.title}
                      {option.quantity && option.quantity > 1 ? ` (${option.quantity}개)` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <PriceCalculator 
          basePrice={getBasePrice()} 
          optionsTotal={getOptionsTotal()}
          selectedOptions={getOptionsSummary()}
        />
      </div>
      
      <div className="text-center">
        <Button 
          onClick={handleExternalBooking}
          className="w-full bg-merrymoment-brown hover:bg-merrymoment-darkbrown text-white py-3 px-6 rounded font-pretendard"
        >
          예약하기
        </Button>
        <p className="mt-3 text-sm text-merrymoment-brown font-pretendard">
          예약 버튼을 클릭하면 외부 예약 시스템으로 연결됩니다.
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
