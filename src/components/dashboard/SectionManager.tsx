"use client";

import React from "react";
import { ChevronUp, ChevronDown, Eye, EyeOff } from "lucide-react";

interface SectionManagerProps {
  sectionOrder: string[];
  hiddenSections: string[];
  onOrderChange: (newOrder: string[]) => void;
  onVisibilityChange: (hidden: string[]) => void;
}

const SECTION_LABELS: Record<string, string> = {
  objective: "Objective",
  education: "Education",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  achievements: "Achievements",
  interests: "Interests",
};

export const SectionManager: React.FC<SectionManagerProps> = ({
  sectionOrder,
  hiddenSections,
  onOrderChange,
  onVisibilityChange,
}) => {
  const moveSection = (index: number, direction: "up" | "down") => {
    const newOrder = [...sectionOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    [newOrder[index], newOrder[targetIndex]] = [
      newOrder[targetIndex],
      newOrder[index],
    ];
    onOrderChange(newOrder);
  };

  const toggleVisibility = (sectionKey: string) => {
    if (hiddenSections.includes(sectionKey)) {
      onVisibilityChange(hiddenSections.filter((s) => s !== sectionKey));
    } else {
      onVisibilityChange([...hiddenSections, sectionKey]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
        <Eye className="w-4 h-4" /> Manage Sections
      </h3>

      <div className="space-y-1">
        {sectionOrder.map((sectionKey, index) => {
          const isHidden = hiddenSections.includes(sectionKey);
          return (
            <div
              key={sectionKey}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                isHidden
                  ? "bg-gray-100 border-gray-200 opacity-60"
                  : "bg-white border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleVisibility(sectionKey)}
                  className={`p-1 rounded-lg transition-colors ${
                    isHidden
                      ? "text-gray-400 hover:text-gray-600"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                  title={isHidden ? "Show section" : "Hide section"}
                >
                  {isHidden ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <span
                  className={`text-sm font-medium ${
                    isHidden ? "text-gray-400 line-through" : "text-gray-700"
                  }`}
                >
                  {SECTION_LABELS[sectionKey] || sectionKey}
                </span>
              </div>

              <div className="flex gap-0.5">
                <button
                  onClick={() => moveSection(index, "up")}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors hover:bg-gray-100"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveSection(index, "down")}
                  disabled={index === sectionOrder.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors hover:bg-gray-100"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 text-center">
        Use arrows to reorder • Click eye to hide
      </p>
    </div>
  );
};
