
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PackageFeature {
  text: string;
}

interface PackageCardProps {
  title: string;
  weekdayPrice: number;
  weekendPrice: number;
  isWeekend: boolean;
  features: PackageFeature[];
  isSelected: boolean;
  onClick: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  weekdayPrice,
  weekendPrice,
  isWeekend,
  features,
  isSelected,
  onClick,
}) => {
  const currentPrice = isWeekend ? weekendPrice : weekdayPrice;
  
  return (
    <div 
      className={cn("package-card", isSelected && "selected")}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-merrymoment-brown rounded-full p-1">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}
      
      <h3 className="text-xl font-medium font-serif mb-3">{title}</h3>
      <div className="price-display mb-5 text-merrymoment-darkbrown">
        <span className="text-xl font-medium">
          {currentPrice.toLocaleString()}원
        </span>
        <span className="text-sm ml-1 text-merrymoment-brown">
          {isWeekend ? '(주말)' : '(평일)'}
        </span>
      </div>
      
      <ul className="space-y-2 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-2 mt-0.5 text-merrymoment-brown">
              <Check className="h-4 w-4" />
            </div>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageCard;
