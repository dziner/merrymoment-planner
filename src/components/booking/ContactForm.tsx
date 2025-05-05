
import React from 'react';
import SelectedPackageInfo from '@/components/SelectedPackageInfo';
import PriceCalculator from '@/components/PriceCalculator';

interface ContactFormProps {
  selectedPackage: string | null;
  packageData: any;
  isWeekend: boolean;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getBasePrice: () => number;
  getOptionsTotal: () => number;
  getOptionsSummary: () => any[];
}

const ContactForm: React.FC<ContactFormProps> = ({
  selectedPackage,
  packageData,
  isWeekend,
  contactInfo,
  handleInputChange,
  getBasePrice,
  getOptionsTotal,
  getOptionsSummary
}) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-brandon text-merrymoment-darkbrown mb-2">
          정보 입력
        </h2>
        <p className="text-merrymoment-brown font-pretendard">
          예약자 정보를 입력해주세요.
        </p>
      </div>
      
      {/* Selected Package Info Display */}
      {selectedPackage && packageData[selectedPackage] && (
        <SelectedPackageInfo
          packageTitle={packageData[selectedPackage].title}
          englishTitle={packageData[selectedPackage].englishTitle}
          price={isWeekend ? packageData[selectedPackage].weekendPrice : packageData[selectedPackage].weekdayPrice}
          features={packageData[selectedPackage].features}
          isWeekend={isWeekend}
        />
      )}
      
      <div className="mb-6">
        <PriceCalculator 
          basePrice={getBasePrice()} 
          optionsTotal={getOptionsTotal()}
          selectedOptions={getOptionsSummary()}
        />
      </div>

      <div className="mb-6 text-center">
        <p className="text-sm text-merrymoment-brown font-pretendard italic">
          선택하신 상품과 옵션은 상담과정을 통해 고객분들의 필요와 선호에 따라 정확히 다시 안내드립니다.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-merrymoment-brown font-pretendard">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactInfo.name}
            onChange={handleInputChange}
            className="w-full border border-merrymoment-beige rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-merrymoment-beige"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block mb-1 text-merrymoment-brown font-pretendard">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactInfo.phone}
            onChange={handleInputChange}
            className="w-full border border-merrymoment-beige rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-merrymoment-beige"
            placeholder="010-0000-0000"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1 text-merrymoment-brown font-pretendard">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactInfo.email}
            onChange={handleInputChange}
            className="w-full border border-merrymoment-beige rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-merrymoment-beige"
            placeholder="선택 사항입니다"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
