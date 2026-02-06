import React from "react";
import Image from "next/image";
import { CVData } from "../../../types/cv";
import { ModernInput } from "../ModernInput";
import { RichTextEditor } from "../RichTextEditor";

interface PersonalInfoStepProps {
  cvData: CVData;
  updatePersonalInfo: (field: keyof CVData["personalInfo"], value: string) => void;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
  handleAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  cvData,
  updatePersonalInfo,
  setCvData,
  handleAvatarUpload,
}) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
        Personal Information
      </h2>

      {/* Avatar Upload */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="w-16 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 border border-gray-300 shadow-sm relative">
          {cvData.personalInfo.avatar ? (
            <Image
              src={cvData.personalInfo.avatar}
              alt="Avatar Preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-[10px]">No Image</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
          />
          <p className="text-xs text-gray-400 mt-1">
            Recommended: Portrait ratio (e.g. 3x4)
          </p>
        </div>
      </div>

      <ModernInput
        label="Full Name"
        value={cvData.personalInfo.fullName}
        onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
      />
      <ModernInput
        label="Professional Title"
        value={cvData.personalInfo.title}
        onChange={(e) => updatePersonalInfo("title", e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <ModernInput
          label="Email"
          value={cvData.personalInfo.email}
          onChange={(e) => updatePersonalInfo("email", e.target.value)}
        />
        <ModernInput
          label="Phone"
          value={cvData.personalInfo.phone}
          onChange={(e) => updatePersonalInfo("phone", e.target.value)}
        />
      </div>
      <ModernInput
        label="Address"
        value={cvData.personalInfo.address}
        onChange={(e) => updatePersonalInfo("address", e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <ModernInput
          label="Birth Date"
          value={cvData.personalInfo.birthDate}
          onChange={(e) => updatePersonalInfo("birthDate", e.target.value)}
        />
        <ModernInput
          label="Github"
          value={cvData.personalInfo.github}
          onChange={(e) => updatePersonalInfo("github", e.target.value)}
        />
      </div>
      <div className="space-y-4 mt-8">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
          Objective
        </h2>
        <label className="text-sm font-semibold text-gray-700 ml-1">
          Define your career goals (Rich Text)
        </label>
        <RichTextEditor
          value={cvData.objective}
          onChange={(val) =>
            setCvData((prev) => ({ ...prev, objective: val }))
          }
        />
      </div>
    </div>
  );
};
