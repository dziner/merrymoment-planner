
import { useState } from 'react';

interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

export function useBookingState() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isWeekend, setIsWeekend] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [selectedNestedOptions, setSelectedNestedOptions] = useState<Record<string, Record<string, number>>>({
    'album': {},
    'frame': {}
  });
  const [optionQuantities, setOptionQuantities] = useState<Record<number, number>>({});
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    phone: "",
    email: "",
  });

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleWeekendToggle = (weekend: boolean) => {
    setIsWeekend(weekend);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const clearNestedOptions = (optionType: string) => {
    setSelectedNestedOptions(prev => ({
      ...prev,
      [optionType]: {}
    }));
  };

  const handleOptionToggle = (optionId: number, addOnOptions: any[]) => {
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
        if (option?.hasQuantity) {
          setOptionQuantities(prev => ({
            ...prev,
            [optionId]: 1
          }));
        }
        return [...prev, optionId];
      }
    });
  };

  const handleNestedOptionSelect = (optionType: string, optionId: string, quantity: number) => {
    console.log(`Setting nested option: ${optionType}, ${optionId}, quantity: ${quantity}`);
    
    setSelectedNestedOptions(prev => {
      const updatedOptions = { ...prev };
      
      // If quantity is 0, remove the option
      if (quantity <= 0) {
        const newTypeOptions = { ...updatedOptions[optionType] };
        delete newTypeOptions[optionId];
        updatedOptions[optionType] = newTypeOptions;
      } else {
        // Otherwise update the quantity - ensure we don't modify other options
        updatedOptions[optionType] = {
          ...updatedOptions[optionType],
          [optionId]: quantity
        };
      }
      
      console.log("Updated nested options:", updatedOptions);
      return updatedOptions;
    });
  };
  
  const handleQuantityChange = (optionId: number, quantity: number, addOnOptions: any[]) => {
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

  return {
    currentStep,
    setCurrentStep,
    selectedPackage,
    setSelectedPackage,
    isWeekend,
    setIsWeekend,
    selectedOptions,
    setSelectedOptions,
    selectedNestedOptions,
    setSelectedNestedOptions,
    optionQuantities,
    setOptionQuantities,
    contactInfo,
    setContactInfo,
    handlePackageSelect,
    handleWeekendToggle,
    handleInputChange,
    clearNestedOptions,
    handleOptionToggle,
    handleNestedOptionSelect,
    handleQuantityChange,
  };
}
