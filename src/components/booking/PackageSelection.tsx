
import React from 'react';
import WeekdayToggle from '@/components/WeekdayToggle';
import PackageCard from '@/components/PackageCard';
import { PackageData } from '@/services/dataService';

interface PackageSelectionProps {
  isWeekend: boolean;
  onWeekendToggle: (isWeekend: boolean) => void;
  selectedPackage: string | null;
  onPackageSelect: (packageName: string) => void;
  packageData: Record<string, PackageData>;
}

const PackageSelection: React.FC<PackageSelectionProps> = ({
  isWeekend,
  onWeekendToggle,
  selectedPackage,
  onPackageSelect,
  packageData
}) => {
  return (
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
        <WeekdayToggle isWeekend={isWeekend} onChange={onWeekendToggle} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.values(packageData).map(pkg => (
          <PackageCard
            key={pkg.id}
            title={pkg.title}
            englishTitle={pkg.englishTitle}
            weekdayPrice={pkg.weekdayPrice}
            weekendPrice={pkg.weekendPrice}
            isWeekend={isWeekend}
            features={pkg.features}
            isSelected={selectedPackage === pkg.id}
            onClick={() => onPackageSelect(pkg.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageSelection;
