import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export default function ProgressBar({ currentStep, totalSteps, className = "" }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${percentage}%` }}></div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span key={index} className={index < currentStep ? "text-blue-600 font-medium" : ""}>
            Step {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
