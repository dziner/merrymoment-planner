import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StepIndicator from '@/components/StepIndicator';
import PackageCard from '@/components/PackageCard';
import WeekdayToggle from '@/components/WeekdayToggle';
import OptionCard from '@/components/OptionCard';
import PriceCalculator from '@/components/PriceCalculator';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

// Package and option data
const packageData = {
  merryBasic: {
    title: "메리 베이직",
    englishTitle: "merry.Basic",
    weekdayPrice: 590000,
    weekendPrice: 640000,
    features: [
      { text: "60분 촬영" },
      { text: "10장 보정본 제공" },
      { text: "모든 원본 사진 (ZIP)" },
      { text: "기본 화관 포함" },
      { text: "모바일 갤러리 포함" },
    ],
  },
  momentPremium: {
    title: "모먼트 프리미엄",
    englishTitle: "merry.Premium",
    weekdayPrice: 790000,
    weekendPrice: 850000,
    features: [
      { text: "90분 촬영" },
      { text: "20장 보정본 제공" },
      { text: "프리미엄 액자 1개 포함" },
      { text: "모든 원본 사진 (ZIP)" },
      { text: "기본 화관 포함" },
      { text: "모바일 갤러리 포함" },
    ],
  }
};

// Frame size options
const frameSizeOptions = [
  { id: 'frame-4x6', title: '4x6 사이즈', price: 0 },
  { id: 'frame-5x7', title: '5x7 사이즈', price: 20000 }
];

// Album size options
const albumSizeOptions = [
  { id: 'album-8x11', title: '8x11 사이즈', price: 0 },
  { id: 'album-11x14', title: '11x14 사이즈', price: 30000 },
  { id: 'album-mini', title: '미니앨범', price: -20000 }
];

// Add on options
const addOnOptions = [
  { id: 1, title: "보정본 5장 추가", price: 70000 },
  { id: 2, title: "보정본 10장 추가", price: 120000 },
  { id: 3, title: "추가 인원", price: 50000, hasQuantity: true },
  { id: 4, title: "쌍둥이 촬영", price: 60000 },
  { id: 5, title: "백일/돌상 세팅", price: 100000 },
  { id: 6, title: "생화 화관", price: 50000 },
  { id: 7, title: "하드커버 앨범", price: 120000, hasNestedOptions: true, optionsType: 'album', hasQuantity: true },
  { id: 8, title: "프리미엄 액자", price: 90000, hasNestedOptions: true, optionsType: 'frame', hasQuantity: true },
];

const steps = ["패키지 선택", "옵션 선택", "정보 입력", "예약 완료"];

const Booking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isWeekend, setIsWeekend] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [selectedNestedOptions, setSelectedNestedOptions] = useState<Record<string, Record<string, number>>>({
    'album': {},
    'frame': {}
  });
  const [optionQuantities, setOptionQuantities] = useState<Record<number, number>>({});
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  
  const { toast } = useToast();

  useEffect(() => {
    // This will ensure the progress bar is properly updated
    document.title = `MerryMoment - ${steps[currentStep]}`;
  }, [currentStep]);

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleOptionToggle = (optionId: number) => {
    setSelectedOptions((prev) => {
      const isAlreadySelected = prev.includes(optionId);
      
      // If deselecting an option with nested options, clear its nested selection
      if (isAlreadySelected) {
        const option = addOnOptions.find(opt => opt.id === optionId);
        if (option?.optionsType) {
          clearNestedOptions(option.optionsType);
        }
        // Also clear quantity
        setOptionQuantities(prev => {
          const newQuantities = {...prev};
          delete newQuantities[optionId];
          return newQuantities;
        });
        return prev.filter((id) => id !== optionId);
      } else {
        // When selecting option, set default quantity to 1
        const option = addOnOptions.find(opt => opt.id === optionId);
        if (option?.hasQuantity && !option?.hasNestedOptions) {
          setOptionQuantities(prev => ({
            ...prev,
            [optionId]: 1
          }));
        }
        return [...prev, optionId];
      }
    });
  };

  const clearNestedOptions = (optionType: string) => {
    setSelectedNestedOptions(prev => ({
      ...prev,
      [optionType]: {}
    }));
  };

  const handleNestedOptionSelect = (optionType: string, optionId: string, quantity: number) => {
    setSelectedNestedOptions(prev => {
      const updatedOptions = { ...prev };
      
      // If quantity is 0, remove the option
      if (quantity <= 0) {
        const newTypeOptions = { ...updatedOptions[optionType] };
        delete newTypeOptions[optionId];
        updatedOptions[optionType] = newTypeOptions;
      } else {
        // Otherwise update the quantity
        updatedOptions[optionType] = {
          ...updatedOptions[optionType],
          [optionId]: quantity
        };
      }
      
      return updatedOptions;
    });
  };
  
  const handleQuantityChange = (optionId: number, quantity: number) => {
    if (quantity === 0) {
      // If quantity is 0, remove the option
      const option = addOnOptions.find(opt => opt.id === optionId);
      if (option?.optionsType) {
        clearNestedOptions(option.optionsType);
      }
      
      setSelectedOptions(prev => prev.filter(id => id !== optionId));
      setOptionQuantities(prev => {
        const newQuantities = {...prev};
        delete newQuantities[optionId];
        return newQuantities;
      });
    } else {
      setOptionQuantities(prev => ({
        ...prev,
        [optionId]: quantity
      }));
    }
  };

  const handleWeekendToggle = (weekend: boolean) => {
    setIsWeekend(weekend);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const getBasePrice = () => {
    if (!selectedPackage) return 0;
    
    const packageInfo = selectedPackage === "merryBasic" 
      ? packageData.merryBasic 
      : packageData.momentPremium;
      
    return isWeekend ? packageInfo.weekendPrice : packageInfo.weekdayPrice;
  };

  // Create summary of selected options for display in PriceCalculator
  const getOptionsSummary = () => {
    const summary: any[] = [];
    
    // Regular options
    selectedOptions.forEach(optionId => {
      const option = addOnOptions.find((opt) => opt.id === optionId);
      if (!option) return;
      
      if (!option.hasNestedOptions) {
        const quantity = optionQuantities[optionId] || 1;
        if (quantity <= 0) return;
        
        summary.push({
          title: option.title,
          quantity: quantity,
          price: option.price * quantity
        });
      } else {
        // For options with nested choices (like albums and frames)
        if (option.optionsType) {
          const nestedSelections = selectedNestedOptions[option.optionsType];
          
          // Process each nested option (e.g., each album size) separately
          Object.entries(nestedSelections).forEach(([nestedId, quantity]) => {
            if (quantity <= 0) return;
            
            const nestedOptionsList = option.optionsType === 'album' ? albumSizeOptions : frameSizeOptions;
            const nestedOption = nestedOptionsList.find(opt => opt.id === nestedId);
            
            if (nestedOption) {
              const totalNestedPrice = (option.price + nestedOption.price) * quantity;
              summary.push({
                title: `${option.title} - ${nestedOption.title}`,
                quantity: quantity,
                price: totalNestedPrice
              });
            }
          });
        }
      }
    });
    
    return summary;
  };

  const getOptionsTotal = () => {
    let optionsTotal = 0;
    
    // Calculate for regular options
    selectedOptions.forEach(optionId => {
      const option = addOnOptions.find((opt) => opt.id === optionId);
      if (!option) return;
      
      if (!option.hasNestedOptions) {
        const quantity = optionQuantities[optionId] || 1;
        if (quantity <= 0) return;
        optionsTotal += option.price * quantity;
      } else {
        // For options with nested choices (albums and frames)
        if (option.optionsType) {
          const nestedSelections = selectedNestedOptions[option.optionsType];
          
          // Add up all selected nested options
          Object.entries(nestedSelections).forEach(([nestedId, quantity]) => {
            if (quantity <= 0) return;
            
            const nestedOptionsList = option.optionsType === 'album' ? albumSizeOptions : frameSizeOptions;
            const nestedOption = nestedOptionsList.find(opt => opt.id === nestedId);
            
            if (nestedOption) {
              optionsTotal += (option.price + nestedOption.price) * quantity;
            }
          });
        }
      }
    });
    
    return optionsTotal;
  };

  const handleNextStep = () => {
    if (currentStep === 0 && !selectedPackage) {
      toast({
        title: "패키지를 선택해주세요",
        description: "계속하기 전에 패키지를 선택하세요.",
      });
      return;
    }
    
    if (currentStep === 2 && (!contactInfo.name || !contactInfo.phone)) {
      toast({
        title: "필수 정보를 입력해주세요",
        description: "이름과 연락처는 필수 입력 사항입니다.",
      });
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleExternalBooking = () => {
    // In a real app, this would redirect to Airtable or send data to it
    window.open("https://airtable.com/booking-form", "_blank");
    
    // For demo purposes, just show a success message
    toast({
      title: "예약 페이지로 이동합니다",
      description: "외부 예약 시스템으로 연결됩니다.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={currentStep} steps={steps} />
          
          {/* Step 1: Package Selection */}
          {currentStep === 0 && (
            <div className="animate-fade-in">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-brandon text-merrymoment-darkbrown mb-2">
                  패키지 선택
                </h2>
                <p className="text-merrymoment-brown font-pretendard">
                  원하시는 촬영 패키지를 선택해주세요.
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-merrymoment-brown mb-2 font-pretendard">촬영 요일 선택</p>
                <WeekdayToggle isWeekend={isWeekend} onChange={handleWeekendToggle} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <PackageCard
                  title={packageData.merryBasic.title}
                  englishTitle={packageData.merryBasic.englishTitle}
                  weekdayPrice={packageData.merryBasic.weekdayPrice}
                  weekendPrice={packageData.merryBasic.weekendPrice}
                  isWeekend={isWeekend}
                  features={packageData.merryBasic.features}
                  isSelected={selectedPackage === "merryBasic"}
                  onClick={() => handlePackageSelect("merryBasic")}
                />
                
                <PackageCard
                  title={packageData.momentPremium.title}
                  englishTitle={packageData.momentPremium.englishTitle}
                  weekdayPrice={packageData.momentPremium.weekdayPrice}
                  weekendPrice={packageData.momentPremium.weekendPrice}
                  isWeekend={isWeekend}
                  features={packageData.momentPremium.features}
                  isSelected={selectedPackage === "momentPremium"}
                  onClick={() => handlePackageSelect("momentPremium")}
                />
              </div>
            </div>
          )}
          
          {/* Step 2: Options Selection */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-brandon text-merrymoment-darkbrown mb-2">
                  옵션 선택
                </h2>
                <p className="text-merrymoment-brown font-pretendard">
                  필요한 추가 옵션을 선택해주세요. 
                  <br />(모든 옵션은 촬영 전 변경 가능합니다.)
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {addOnOptions.map((option) => {
                  const hasNestedOptions = option.hasNestedOptions && option.optionsType;
                  let nestedOptions = null;
                  let activeNestedOptions = null;
                  
                  if (hasNestedOptions) {
                    if (option.optionsType === 'frame') {
                      nestedOptions = frameSizeOptions;
                      activeNestedOptions = selectedNestedOptions.frame;
                    } else if (option.optionsType === 'album') {
                      nestedOptions = albumSizeOptions;
                      activeNestedOptions = selectedNestedOptions.album;
                    }
                  }
                  
                  const quantity = optionQuantities[option.id] || 1;
                  
                  return (
                    <OptionCard
                      key={option.id}
                      title={option.title}
                      price={option.price}
                      isSelected={selectedOptions.includes(option.id)}
                      onClick={() => handleOptionToggle(option.id)}
                      nestedOptions={hasNestedOptions ? nestedOptions : undefined}
                      selectedNestedOptions={hasNestedOptions ? activeNestedOptions : undefined}
                      onNestedOptionSelect={hasNestedOptions && option.optionsType 
                        ? (optionId, quantity) => handleNestedOptionSelect(option.optionsType!, optionId, quantity) 
                        : undefined}
                      onNestedOptionClear={hasNestedOptions && option.optionsType
                        ? () => clearNestedOptions(option.optionsType!)
                        : undefined}
                      hasQuantity={option.hasQuantity && !option.hasNestedOptions}
                      quantity={quantity}
                      onQuantityChange={option.hasQuantity && !option.hasNestedOptions
                        ? (newQuantity) => handleQuantityChange(option.id, newQuantity) 
                        : undefined}
                    />
                  );
                })}
              </div>
              
              <div className="mb-8">
                <PriceCalculator 
                  basePrice={getBasePrice()} 
                  optionsTotal={getOptionsTotal()}
                  selectedOptions={getOptionsSummary()}
                />
              </div>
            </div>
          )}
          
          {/* Step 3: Contact Information */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-brandon text-merrymoment-darkbrown mb-2">
                  정보 입력
                </h2>
                <p className="text-merrymoment-brown font-pretendard">
                  예약을 위한 연락처 정보를 입력해주세요.
                </p>
              </div>
              
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
          )}
          
          {/* Step 4: Summary and Finalization */}
          {currentStep === 3 && (
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
                      {selectedPackage === "merryBasic" 
                        ? packageData.merryBasic.title 
                        : packageData.momentPremium.title}
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
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                className="border-merrymoment-beige text-merrymoment-brown hover:bg-merrymoment-beige font-pretendard"
              >
                이전
              </Button>
            )}
            
            {currentStep < 3 && (
              <Button 
                onClick={handleNextStep}
                className={`ml-auto bg-merrymoment-brown hover:bg-merrymoment-darkbrown text-white font-pretendard ${
                  currentStep === 0 && !selectedPackage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                다음
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
