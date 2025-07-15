"use client";

import { useState } from "react";
import PersonalInfo from "./PersonalInfo";

// import PeriodSelection from "./PeriodSelection";
// import CourseSelection from "./CourseSelection";
// import LeisureSelection from "./LeisureSelection";
// import ReviewScreen from "./ReviewScreen";
// import Confirmation from "./Confirmation";
// import ProgressBar from "../ui/ProgressBar";

import { RegistrationData, University, AcademicPeriod } from "@/lib/types";
import ProgressBar from "../ui/ProgressBar";
import Confirmation from "./Confirmation";
import CourseSelection from "./CourseSelection";
import LeisureSelection from "./LeisureSelection";
import PeriodSelection from "./PeriodSelection";
import ReviewScreen from "./ReviewScreen";

interface RegistrationCarouselProps {
  universities: University[];
  currentPeriod: AcademicPeriod;
}

export default function RegistrationCarousel({ universities, currentPeriod }: RegistrationCarouselProps) {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    student: {},
    courses: [],
    leisureTrips: [],
    academicPeriod: currentPeriod,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateData = (newData: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...newData }));
  };

  const steps = [
    { title: "Personal Info", component: <PersonalInfo data={registrationData} updateData={updateData} universities={universities} nextStep={nextStep} /> },
    { title: "Academic Period", component: <PeriodSelection data={registrationData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} /> },
    { title: "Course Selection", component: <CourseSelection data={registrationData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} /> },
    { title: "Leisure Trips", component: <LeisureSelection data={registrationData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} /> },
    { title: "Review", component: <ReviewScreen data={registrationData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} /> },
    { title: "Confirmation", component: <Confirmation data={registrationData} /> },
  ];

  return (
    <div className="min-w-3xl mx-auto">
      <ProgressBar currentStep={step} totalSteps={steps.length} className="mb-8" />
      {steps[step - 1].component}
    </div>
  );
}
