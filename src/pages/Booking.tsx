
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StepIndicator from '@/components/StepIndicator';
import { Button } from '@/components/ui/button';
import { usePackages, useOptions, useAlbumSizes, useFrameSizes } from '@/services/dataService';
import { useBookingState } from '@/hooks/useBookingState';
import { useBookingCalculations } from '@/hooks/useBookingCalculations';
import { useBookingNavigation } from '@/hooks/useBookingNavigation';

// Step components
import PackageSelection from '@/components/booking/PackageSelection';
import OptionsSelection from '@/components/booking/OptionsSelection';
import ContactForm from '@/components/booking/ContactForm';
import BookingSummary from '@/components/booking/BookingSummary';

const steps = ["패키지 선택", "옵션 선택", "정보 입력", "예약 완료"];

const Booking: React.FC = () => {
  // Get booking state and handlers from custom hook
  const {
    currentStep,
    setCurrentStep,
    selectedPackage,
    isWeekend,
    selectedOptions,
    selectedNestedOptions,
    optionQuantities,
    contactInfo,
    handlePackageSelect,
    handleWeekendToggle,
    handleInputChange,
    clearNestedOptions,
    handleOptionToggle,
    handleNestedOptionSelect,
    handleQuantityChange,
  } = useBookingState();
  
  // Fetch dynamic data using custom hooks
  const { data: packageData } = usePackages();
  const { data: addOnOptions } = useOptions();
  const { data: albumSizeOptions } = useAlbumSizes();
  const { data: frameSizeOptions } = useFrameSizes();
  
  // Get price calculations
  const { getBasePrice, getOptionsTotal, getOptionsSummary } = useBookingCalculations(
    selectedPackage,
    packageData,
    isWeekend,
    selectedOptions,
    selectedNestedOptions,
    optionQuantities,
    addOnOptions,
    albumSizeOptions,
    frameSizeOptions
  );
  
  // Wrap calculation methods in functions to match expected prop types
  const getBasePriceFunc = () => getBasePrice;
  const getOptionsTotalFunc = () => getOptionsTotal;
  const getOptionsSummaryFunc = () => getOptionsSummary;
  
  // Get navigation handlers
  const { handleNextStep, handlePrevStep, handleExternalBooking } = useBookingNavigation(
    currentStep,
    setCurrentStep,
    selectedPackage,
    contactInfo
  );

  useEffect(() => {
    // Update document title based on current step
    document.title = `MerryMoment - ${steps[currentStep]}`;
  }, [currentStep]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <StepIndicator currentStep={currentStep} steps={steps} />
          </div>
          
          {/* Step 1: Package Selection */}
          {currentStep === 0 && (
            <PackageSelection
              isWeekend={isWeekend}
              onWeekendToggle={handleWeekendToggle}
              selectedPackage={selectedPackage}
              onPackageSelect={handlePackageSelect}
              packageData={packageData}
            />
          )}
          
          {/* Step 2: Options Selection */}
          {currentStep === 1 && (
            <OptionsSelection
              selectedPackage={selectedPackage}
              packageData={packageData}
              isWeekend={isWeekend}
              selectedOptions={selectedOptions}
              onOptionToggle={(optionId) => handleOptionToggle(optionId, addOnOptions)}
              addOnOptions={addOnOptions}
              selectedNestedOptions={selectedNestedOptions}
              onNestedOptionSelect={handleNestedOptionSelect}
              onNestedOptionClear={clearNestedOptions}
              optionQuantities={optionQuantities}
              onQuantityChange={(optionId, quantity) => handleQuantityChange(optionId, quantity, addOnOptions)}
              getBasePrice={getBasePriceFunc}
              getOptionsTotal={getOptionsTotalFunc}
              getOptionsSummary={getOptionsSummaryFunc}
              albumSizeOptions={albumSizeOptions}
              frameSizeOptions={frameSizeOptions}
            />
          )}
          
          {/* Step 3: Contact Information */}
          {currentStep === 2 && (
            <ContactForm
              selectedPackage={selectedPackage}
              packageData={packageData}
              isWeekend={isWeekend}
              contactInfo={contactInfo}
              handleInputChange={handleInputChange}
              getBasePrice={getBasePriceFunc}
              getOptionsTotal={getOptionsTotalFunc}
              getOptionsSummary={getOptionsSummaryFunc}
            />
          )}
          
          {/* Step 4: Summary and Finalization */}
          {currentStep === 3 && (
            <BookingSummary
              contactInfo={contactInfo}
              selectedPackage={selectedPackage}
              packageData={packageData}
              isWeekend={isWeekend}
              getBasePrice={getBasePriceFunc}
              getOptionsTotal={getOptionsTotalFunc}
              getOptionsSummary={getOptionsSummaryFunc}
              handleExternalBooking={handleExternalBooking}
            />
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                className="border-merrymoment-beige text-merrymoment-brown hover:bg-merrymoment-beige font-pretendard px-10 py-4 h-auto text-lg"
              >
                이전
              </Button>
            )}
            
            {currentStep < 3 && (
              <Button 
                onClick={handleNextStep}
                className={`ml-auto bg-merrymoment-brown hover:bg-merrymoment-darkbrown text-white font-pretendard px-10 py-4 h-auto text-lg ${
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
