"use client";

import React, { useState, useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { CVData, CVSettings, DEFAULT_SETTINGS, DEFAULT_SECTION_ORDER } from "../../types/cv";
import { mockCVData } from "../../data/mock-cv";
import { StepIndicator } from "./StepIndicator";
import { CVPreview } from "../cv/CVPreview";
import { ImageCropperModal } from "./ImageCropperModal";
import {
  Download,
  Printer,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Upload,
  Save,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { cn } from "../../lib/utils";

// Start importing steps
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { EducationStep } from "./steps/EducationStep";
import { ExperienceStep } from "./steps/ExperienceStep";
import { ProjectStep } from "./steps/ProjectStep";
import { SettingsStep } from "./steps/SettingsStep";
import { FinalizeStep } from "./steps/FinalizeStep";

const STEPS = [
  "Info & Objective",
  "Education & Skills",
  "Experience",
  "Projects",
  "Style & Layout",
  "Finalize",
];

export const DashboardManager: React.FC = () => {
  // Changed key to v3 to invalidate old data without new fields
  const [cvData, setCvData] = useLocalStorage<CVData>(
    "cv-generator-data-v3",
    mockCVData
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track auto-save
  React.useEffect(() => {
    setLastSaved(new Date());
  }, [cvData]);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `CV_${cvData.personalInfo.fullName.replace(/\s+/g, "_")}`,
  });

  const updatePersonalInfo = (
    field: keyof typeof cvData.personalInfo,
    value: string
  ) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateSettings = (newSettings: CVSettings) => {
    setCvData((prev) => ({
      ...prev,
      settings: newSettings,
    }));
  };

  const resetToDefault = () => {
    if (confirm("Are you sure you want to reset to default mock data?")) {
      setCvData(mockCVData);
    }
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `cv_data_${Date.now()}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        // Merge with defaults to ensure all fields exist
        setCvData({
          ...mockCVData,
          ...importedData,
          settings: { ...DEFAULT_SETTINGS, ...importedData.settings },
          sectionOrder: importedData.sectionOrder || DEFAULT_SECTION_ORDER,
          hiddenSections: importedData.hiddenSections || [],
        });
        alert("Data imported successfully!");
      } catch {
        alert("Invalid JSON file. Please check the file format.");
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    updatePersonalInfo("avatar", croppedImage);
    setImageToCrop(null);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-4 md:p-8 flex flex-col lg:flex-row gap-8">
      {/* Left: Dashboard Form */}
      <div className="w-full lg:w-[450px] xl:w-[500px] flex-shrink-0">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-6 h-full flex flex-col sticky top-8 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CV Designer
            </h1>
            <div className="flex gap-1">
              {/* Import JSON */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={importJSON}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                title="Import JSON Data"
              >
                <Upload className="w-5 h-5" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Print CV"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button
                onClick={exportJSON}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Export Data JSON"
              >
                <Download className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
              <button
                onClick={resetToDefault}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Reset to default"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Auto-save indicator */}
          {lastSaved && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
              <Save className="w-3 h-3" />
              <span>
                Auto-saved at{" "}
                {lastSaved.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )}

          <StepIndicator
            currentStep={currentStep}
            steps={STEPS}
            onStepClick={setCurrentStep}
          />

          <div className="flex-1 mt-4">
            {currentStep === 1 && (
              <PersonalInfoStep
                cvData={cvData}
                updatePersonalInfo={updatePersonalInfo}
                setCvData={setCvData}
                handleAvatarUpload={handleAvatarUpload}
              />
            )}

            {currentStep === 2 && (
              <EducationStep cvData={cvData} setCvData={setCvData} />
            )}

            {currentStep === 3 && (
              <ExperienceStep cvData={cvData} setCvData={setCvData} />
            )}

            {currentStep === 4 && (
              <ProjectStep cvData={cvData} setCvData={setCvData} />
            )}

            {currentStep === 5 && (
              <SettingsStep
                cvData={cvData}
                updateSettings={updateSettings}
                setCvData={setCvData}
              />
            )}

            {currentStep === 6 && (
              <FinalizeStep
                cvData={cvData}
                setCvData={setCvData}
                handlePrint={handlePrint}
                exportJSON={exportJSON}
              />
            )}
          </div>

          <div className="mt-8 pt-6 border-t flex justify-between">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={cn(
                "px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2",
                currentStep === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <ArrowLeft className="w-5 h-5" /> Previous
            </button>
            <button
              onClick={() =>
                setCurrentStep((prev) => Math.min(STEPS.length, prev + 1))
              }
              disabled={currentStep === STEPS.length}
              className={cn(
                "px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-md shadow-blue-100 hover:bg-blue-700",
                currentStep === STEPS.length ? "hidden" : ""
              )}
            >
              Next <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="flex-1 overflow-x-auto lg:overflow-visible">
        <div className="min-w-[210mm] lg:min-w-0 flex justify-center pb-20">
          <CVPreview ref={previewRef} data={cvData} />
        </div>
      </div>
      {/* Modal cắt ảnh */}
      {imageToCrop && (
        <ImageCropperModal
          image={imageToCrop}
          onCropComplete={handleCropComplete}
          onCancel={() => setImageToCrop(null)}
        />
      )}
    </div>
  );
};
