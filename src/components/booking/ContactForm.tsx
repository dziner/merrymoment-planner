
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
          예약을 위한 연락처 정보를 입력해주세요.
        </p>
      </div>
      
      {/* Show selected package info on this step too */}
      {selectedPackage && packageData[selectedPackage] && (
        <SelectedPackageInfo
          packageTitle={packageData[selectedPackage].title}
          englishTitle={packageData[selectedPackage].englishTitle}
          price={isWeekend ? packageData[selectedPackage].weekendPrice : packageData[selectedPackage].weekdayPrice}
          features={packageData[selectedPackage].features}
          isWeekend={isWeekend}
        />
      )}
      
      <div className="space-y-4 mb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-merrymoment-darkbrown font-pretendard">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactInfo.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-merrymoment-beige rounded-md focus:outline-none focus:border-merrymoment-brown font-pretendard"
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1 text-merrymoment-darkbrown font-pretendard">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactInfo.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-merrymoment-beige rounded-md focus:outline-none focus:border-merrymoment-brown font-pretendard"
            placeholder="010-0000-0000"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-merrymoment-darkbrown font-pretendard">
            이메일 (선택)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactInfo.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-merrymoment-beige rounded-md focus:outline-none focus:border-merrymoment-brown font-pretendard"
            placeholder="example@email.com"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <PriceCalculator 
          basePrice={getBasePrice()} 
          optionsTotal={getOptionsTotal()}
          selectedOptions={getOptionsSummary()} 
        />
      </div>
    </div>
  );
};

export default ContactForm;
