
import React from 'react';
import { Check } from 'lucide-react';

interface Feature {
  text: string;
}

interface SelectedPackageInfoProps {
  packageTitle: string;
  englishTitle: string;
  price: number;
  features: Feature[];
  isWeekend: boolean;
}

const SelectedPackageInfo: React.FC<SelectedPackageInfoProps> = ({
  packageTitle,
  englishTitle,
  price,
  features,
  isWeekend,
}) => {
  return (
    <div className="border border-merrymoment-beige rounded-md p-4 mb-6 bg-merrymoment-cream/30">
      {englishTitle ? (
        <>
          <h3 className="text-xl font-medium font-rozha mb-1">{englishTitle}</h3>
          <p className="text-sm font-pretendard mb-2 text-merrymoment-brown">{packageTitle}</p>
        </>
      ) : (
        <h3 className="text-xl font-medium font-pretendard mb-3">{packageTitle}</h3>
      )}
      
      <div className="price-display mb-5 text-merrymoment-darkbrown">
        <span className="text-xl font-medium font-pretendard">
          {price.toLocaleString()}원
        </span>
        <span className="text-sm ml-1 text-merrymoment-brown font-pretendard">
          {isWeekend ? '(주말)' : '(평일)'}
        </span>
      </div>
      
      <ul className="space-y-2 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-2 mt-0.5 text-merrymoment-brown">
              <Check className="h-4 w-4" />
            </div>
            <span className="font-pretendard">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedPackageInfo;
