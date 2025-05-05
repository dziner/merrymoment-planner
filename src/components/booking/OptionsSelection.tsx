
import React from 'react';
import SelectedPackageInfo from '@/components/SelectedPackageInfo';
import PriceCalculator from '@/components/PriceCalculator';
import OptionCard from '@/components/OptionCard';
import { OptionData } from '@/services/dataService';

interface OptionsSelectionProps {
  selectedPackage: string | null;
  packageData: any;
  isWeekend: boolean;
  selectedOptions: number[];
  onOptionToggle: (optionId: number) => void;
  addOnOptions: OptionData[];
  selectedNestedOptions: Record<string, Record<string, number>>;
  onNestedOptionSelect: (optionType: string, optionId: string, quantity: number) => void;
  onNestedOptionClear: (optionType: string) => void;
  optionQuantities: Record<number, number>;
  onQuantityChange: (optionId: number, quantity: number) => void;
  getBasePrice: () => number;
  getOptionsTotal: () => number;
  getOptionsSummary: () => any[];
  albumSizeOptions: any[];
  frameSizeOptions: any[];
}

const OptionsSelection: React.FC<OptionsSelectionProps> = ({
  selectedPackage,
  packageData,
  isWeekend,
  selectedOptions,
  onOptionToggle,
  addOnOptions,
  selectedNestedOptions,
  onNestedOptionSelect,
  onNestedOptionClear,
  optionQuantities,
  onQuantityChange,
  getBasePrice,
  getOptionsTotal,
  getOptionsSummary,
  albumSizeOptions,
  frameSizeOptions
}) => {
  console.log("Render OptionsSelection with: ", { addOnOptions, selectedNestedOptions });
  
  // Helper function to calculate price range for options with nested choices
  const getPriceRange = (optionType: string, basePrice: number): string => {
    const sizeOptions = optionType === 'album' ? albumSizeOptions : frameSizeOptions;
    
    if (sizeOptions && sizeOptions.length > 0) {
      // Find min and max prices
      let prices = sizeOptions.map(option => basePrice + option.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      // Format the price range
      if (minPrice === maxPrice) {
        return `${minPrice.toLocaleString()}원`;
      }
      return `${minPrice.toLocaleString()}~${maxPrice.toLocaleString()}원`;
    }
    
    return `${basePrice.toLocaleString()}원`;
  };
  
  return (
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
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {addOnOptions.map((option) => {
          // Check both optionsType and optionType properties
          const hasNestedOptions = option.hasNestedOptions;
          let nestedOptions = null;
          let activeNestedOptions = null;
          let priceDisplay: string | number = option.price;
          
          if (hasNestedOptions && option.optionsType) {
            console.log(`Processing nested options for ${option.title}, type: ${option.optionsType}`);
            
            // For options with nested choices, calculate price range
            priceDisplay = getPriceRange(option.optionsType, option.price);
            
            if (option.optionsType === 'frame') {
              nestedOptions = frameSizeOptions;
              activeNestedOptions = selectedNestedOptions.frame;
              console.log("Frame options:", { nestedOptions, activeNestedOptions });
            } else if (option.optionsType === 'album') {
              nestedOptions = albumSizeOptions;
              activeNestedOptions = selectedNestedOptions.album;
              console.log("Album options:", { nestedOptions, activeNestedOptions });
            }
          }
          
          const quantity = optionQuantities[option.id] || 1;
          // Only show quantity selector for options without nested options
          const showQuantitySelector = !hasNestedOptions;
          
          return (
            <OptionCard
              key={option.id}
              title={option.title}
              price={priceDisplay}
              isSelected={selectedOptions.includes(option.id)}
              onClick={() => onOptionToggle(option.id)}
              nestedOptions={hasNestedOptions && nestedOptions ? nestedOptions : undefined}
              selectedNestedOptions={hasNestedOptions ? activeNestedOptions : undefined}
              onNestedOptionSelect={hasNestedOptions && option.optionsType 
                ? (optionId, quantity) => onNestedOptionSelect(option.optionsType!, optionId, quantity) 
                : undefined}
              onNestedOptionClear={hasNestedOptions && option.optionsType
                ? () => onNestedOptionClear(option.optionsType!)
                : undefined}
              hasQuantity={option.hasQuantity && !hasNestedOptions}
              quantity={quantity}
              onQuantityChange={option.hasQuantity && !hasNestedOptions
                ? (newQuantity) => onQuantityChange(option.id, newQuantity) 
                : undefined}
              showQuantitySelector={showQuantitySelector}
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
  );
};

export default OptionsSelection;
