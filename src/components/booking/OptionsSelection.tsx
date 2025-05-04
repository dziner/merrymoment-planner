
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
              onClick={() => onOptionToggle(option.id)}
              nestedOptions={hasNestedOptions ? nestedOptions : undefined}
              selectedNestedOptions={hasNestedOptions ? activeNestedOptions : undefined}
              onNestedOptionSelect={hasNestedOptions && option.optionsType 
                ? (optionId, quantity) => onNestedOptionSelect(option.optionsType!, optionId, quantity) 
                : undefined}
              onNestedOptionClear={hasNestedOptions && option.optionsType
                ? () => onNestedOptionClear(option.optionsType!)
                : undefined}
              hasQuantity={option.hasQuantity && !option.hasNestedOptions}
              quantity={quantity}
              onQuantityChange={option.hasQuantity && !option.hasNestedOptions
                ? (newQuantity) => onQuantityChange(option.id, newQuantity) 
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
  );
};

export default OptionsSelection;
