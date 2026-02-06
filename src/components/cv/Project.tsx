import React from "react";
import { Project } from "../../types/cv";

interface ProjectProps {
  items: Project[];
}

export const CVProject: React.FC<ProjectProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="ml-2">
          <div className="flex gap-2 items-baseline">
            <span className="font-bold text-gray-900 leading-tight">
              • Project: {item.name}
            </span>
          </div>
          <div className="ml-6 space-y-1">
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
