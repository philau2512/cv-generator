import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
  onStepClick?: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center relative z-10">
            <div
              onClick={() => onStepClick && onStepClick(index + 1)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer hover:scale-105",
                currentStep > index + 1
                  ? "bg-blue-600 border-blue-600 text-white"
                  : currentStep === index + 1
                    ? "border-blue-600 text-blue-600 ring-4 ring-blue-50 bg-white"
                    : "border-gray-300 text-gray-400 bg-white hover:border-gray-400"
              )}
            >
              {currentStep > index + 1 ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="font-bold">{index + 1}</span>
              )}
            </div>
            <span
              className={cn(
                "absolute top-12 text-xs font-medium whitespace-nowrap transition-colors duration-300",
                currentStep >= index + 1 ? "text-blue-600" : "text-gray-400",
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-4 -mt-4 transition-colors duration-500",
                currentStep > index + 1 ? "bg-blue-600" : "bg-gray-200",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
