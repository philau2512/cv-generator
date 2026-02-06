import React from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { CVData } from "../../../types/cv";
import { ModernInput } from "../ModernInput";
import { RichTextEditor } from "../RichTextEditor";

interface EducationStepProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const EducationStep: React.FC<EducationStepProps> = ({
  cvData,
  setCvData,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
        Education
      </h2>
      {cvData.education.map((edu, idx) => (
        <div
          key={idx}
          className="p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group"
        >
          <div className="absolute -top-2 -right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => {
                if (idx === 0) return;
                const newEdu = [...cvData.education];
                [newEdu[idx], newEdu[idx - 1]] = [newEdu[idx - 1], newEdu[idx]];
                setCvData((prev) => ({ ...prev, education: newEdu }));
              }}
              disabled={idx === 0}
              className="p-1.5 bg-white shadow-md rounded-full text-gray-500 hover:text-blue-600 disabled:opacity-50"
              title="Move Up"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (idx === cvData.education.length - 1) return;
                const newEdu = [...cvData.education];
                [newEdu[idx], newEdu[idx + 1]] = [newEdu[idx + 1], newEdu[idx]];
                setCvData((prev) => ({ ...prev, education: newEdu }));
              }}
              disabled={idx === cvData.education.length - 1}
              className="p-1.5 bg-white shadow-md rounded-full text-gray-500 hover:text-blue-600 disabled:opacity-50"
              title="Move Down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const newEdu = [...cvData.education];
                newEdu.splice(idx, 1);
                setCvData((prev) => ({ ...prev, education: newEdu }));
              }}
              className="p-1.5 bg-white shadow-md rounded-full text-red-500 hover:bg-red-50"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <ModernInput
                label="School"
                value={edu.school}
                onChange={(e) => {
                  const newEdu = [...cvData.education];
                  newEdu[idx].school = e.target.value;
                  setCvData((prev) => ({
                    ...prev,
                    education: newEdu,
                  }));
                }}
              />
              <ModernInput
                label="Duration"
                value={edu.duration}
                onChange={(e) => {
                  const newEdu = [...cvData.education];
                  newEdu[idx].duration = e.target.value;
                  setCvData((prev) => ({
                    ...prev,
                    education: newEdu,
                  }));
                }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Major & Details
              </label>
              <RichTextEditor
                value={edu.major}
                onChange={(val) => {
                  const newEdu = [...cvData.education];
                  newEdu[idx].major = val;
                  setCvData((prev) => ({
                    ...prev,
                    education: newEdu,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          setCvData((prev) => ({
            ...prev,
            education: [
              ...prev.education,
              {
                school: "",
                major: "",
                duration: "",
                description: "",
              },
            ],
          }))
        }
        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-all font-medium"
      >
        <Plus className="w-5 h-5" /> Add Education
      </button>

      <div className="space-y-4 border-t pt-6">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
          Skills
        </h2>
        <label className="text-sm font-semibold text-gray-700 ml-1">
          Technical & Soft Skills
        </label>
        <RichTextEditor
          value={cvData.skills}
          onChange={(val) =>
            setCvData((prev) => ({ ...prev, skills: val }))
          }
        />
      </div>
    </div>
  );
};
