
import React from 'react';

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
      <h3 className="font-rozha-one text-xl text-merrymoment-darkbrown mb-1">{englishTitle}</h3>
      <h4 className="text-sm text-merrymoment-brown mb-2">{packageTitle}</h4>
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-merrymoment-brown">{isWeekend ? '주말' : '평일'}</span>
        <span className="text-lg font-medium text-merrymoment-darkbrown">{price.toLocaleString()}원</span>
      </div>
      
      <div className="text-xs text-merrymoment-brown">
        <p className="mb-1">포함 사항:</p>
        <ul className="list-disc pl-5">
          {features.map((feature, index) => (
            <li key={index}>{feature.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectedPackageInfo;
