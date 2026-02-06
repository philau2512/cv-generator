import React from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { CVData } from "../../../types/cv";
import { ModernInput } from "../ModernInput";
import { RichTextEditor } from "../RichTextEditor";

interface ProjectStepProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const ProjectStep: React.FC<ProjectStepProps> = ({
  cvData,
  setCvData,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 overflow-y-auto pr-2">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
        Projects
      </h2>
      {cvData.projects.map((proj, idx) => (
        <div
          key={idx}
          className="p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group space-y-3"
        >
          <div className="absolute -top-2 -right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => {
                if (idx === 0) return;
                const newProjects = [...cvData.projects];
                [newProjects[idx], newProjects[idx - 1]] = [
                  newProjects[idx - 1],
                  newProjects[idx],
                ];
                setCvData((prev) => ({ ...prev, projects: newProjects }));
              }}
              disabled={idx === 0}
              className="p-1.5 bg-white shadow-md rounded-full text-gray-500 hover:text-blue-600 disabled:opacity-50"
              title="Move Up"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (idx === cvData.projects.length - 1) return;
                const newProjects = [...cvData.projects];
                [newProjects[idx], newProjects[idx + 1]] = [
                  newProjects[idx + 1],
                  newProjects[idx],
                ];
                setCvData((prev) => ({ ...prev, projects: newProjects }));
              }}
              disabled={idx === cvData.projects.length - 1}
              className="p-1.5 bg-white shadow-md rounded-full text-gray-500 hover:text-blue-600 disabled:opacity-50"
              title="Move Down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const newProjects = [...cvData.projects];
                newProjects.splice(idx, 1);
                setCvData((prev) => ({ ...prev, projects: newProjects }));
              }}
              className="p-1.5 bg-white shadow-md rounded-full text-red-500 hover:bg-red-50"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <ModernInput
            label="Project Name"
            value={proj.name}
            onChange={(e) => {
              const newProjects = [...cvData.projects];
              newProjects[idx].name = e.target.value;
              setCvData((prev) => ({ ...prev, projects: newProjects }));
            }}
          />

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Description
            </label>
            <RichTextEditor
              value={proj.description}
              onChange={(val) => {
                const newProjects = [...cvData.projects];
                newProjects[idx].description = val;
                setCvData((prev) => ({
                  ...prev,
                  projects: newProjects,
                }));
              }}
            />
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          setCvData((prev) => ({
            ...prev,
            projects: [
              ...prev.projects,
              {
                name: "",

                description: "",
              },
            ],
          }))
        }
        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-all font-medium"
      >
        <Plus className="w-5 h-5" /> Add Project
      </button>
    </div>
  );
};
