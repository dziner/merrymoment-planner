
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SelectedPackageInfoProps {
  packageTitle: string;
  englishTitle?: string;
  price: number;
  features: { text: string }[];
  isWeekend: boolean;
}

const SelectedPackageInfo: React.FC<SelectedPackageInfoProps> = ({
  packageTitle,
  englishTitle,
  price,
  features,
  isWeekend
}) => {
  return (
    <Card className="mb-6 bg-merrymoment-cream border-merrymoment-beige">
      <CardContent className="pt-6">
        <div className="mb-4">
          {englishTitle ? (
            <>
              <h3 className="text-3xl font-medium font-rozha mb-1">{englishTitle}</h3>
              <p className="text-sm font-pretendard text-merrymoment-brown">{packageTitle}</p>
            </>
          ) : (
            <h3 className="text-xl font-medium font-pretendard mb-1">{packageTitle}</h3>
          )}
        </div>
        
        <div className="mb-4 text-merrymoment-darkbrown">
          <span className="text-lg font-medium">
            {price.toLocaleString()}원
          </span>
          <span className="text-sm ml-2 text-merrymoment-brown">
            {isWeekend ? '(주말・공휴일)' : '(평일)'}
          </span>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2 text-merrymoment-darkbrown">패키지 구성</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="mr-2 mt-0.5 text-merrymoment-brown">
                  <Check className="h-4 w-4" />
                </span>
                <span className="font-pretendard">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectedPackageInfo;
