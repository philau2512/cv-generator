import React from "react";
import { Experience } from "../../types/cv";

interface ExperienceProps {
  items: Experience[];
  primaryColor?: string;
}

export const CVExperience: React.FC<ExperienceProps> = ({
  items,
  primaryColor = "#1e40af",
}) => {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={index} className="relative">
          <div className="flex justify-between items-start mb-1">
            <h3
              className="font-bold text-lg uppercase"
              style={{ color: primaryColor }}
            >
              {item.role}
            </h3>
            <span
              className="font-semibold whitespace-nowrap"
              style={{ color: primaryColor }}
            >
              {item.duration}
            </span>
          </div>

          <div className="flex flex-col gap-1 italic text-gray-700 mb-2">
            <p className="font-bold">Company: {item.company}</p>
            <p className="font-bold underline">Project: {item.project}</p>
          </div>

          <div className="ml-4 space-y-2">
            <div
              className="text-gray-700 cv-content-rendered prose max-w-none"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
