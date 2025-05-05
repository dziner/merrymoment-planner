
import { useMemo } from 'react';

export function useBookingCalculations(
  selectedPackage: string | null,
  packageData: any,
  isWeekend: boolean,
  selectedOptions: number[],
  selectedNestedOptions: Record<string, Record<string, number>>,
  optionQuantities: Record<number, number>,
  addOnOptions: any[],
  albumSizeOptions: any[],
  frameSizeOptions: any[]
) {
  const getBasePrice = useMemo(() => {
    if (!selectedPackage) return 0;
    
    const packageInfo = packageData[selectedPackage];
    if (!packageInfo) return 0;
      
    return isWeekend ? packageInfo.weekendPrice : packageInfo.weekdayPrice;
  }, [selectedPackage, packageData, isWeekend]);

  const getOptionsSummary = useMemo(() => {
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
              // Use only the nested option price multiplied by quantity
              const totalNestedPrice = nestedOption.price * quantity;
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
  }, [selectedOptions, optionQuantities, selectedNestedOptions, addOnOptions, albumSizeOptions, frameSizeOptions]);

  const getOptionsTotal = useMemo(() => {
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
              // Use only the nested option price multiplied by quantity
              optionsTotal += nestedOption.price * quantity;
            }
          });
        }
      }
    });
    
    return optionsTotal;
  }, [selectedOptions, optionQuantities, selectedNestedOptions, addOnOptions, albumSizeOptions, frameSizeOptions]);

  return {
    getBasePrice,
    getOptionsSummary,
    getOptionsTotal
  };
}
