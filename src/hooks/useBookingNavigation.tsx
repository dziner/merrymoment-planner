
import { useToast } from "@/components/ui/use-toast";

export function useBookingNavigation(
  currentStep: number, 
  setCurrentStep: (step: number | ((prev: number) => number)) => void,
  selectedPackage: string | null,
  contactInfo: { name: string; phone: string; email: string }
) {
  const { toast } = useToast();

  const handleNextStep = () => {
    if (currentStep === 0 && !selectedPackage) {
      toast({
        title: "패키지를 선택해주세요",
        description: "계속하기 전에 패키지를 선택하세요.",
      });
      return;
    }
    
    if (currentStep === 2 && (!contactInfo.name || !contactInfo.phone)) {
      toast({
        title: "필수 정보를 입력해주세요",
        description: "이름과 연락처는 필수 입력 사항입니다.",
      });
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleExternalBooking = () => {
    // In a real app, this would redirect to Airtable or send data to it
    window.open("https://airtable.com/booking-form", "_blank");
    
    // For demo purposes, just show a success message
    toast({
      title: "예약 페이지로 이동합니다",
      description: "외부 예약 시스템으로 연결됩니다.",
    });
  };

  return {
    handleNextStep,
    handlePrevStep,
    handleExternalBooking
  };
}
