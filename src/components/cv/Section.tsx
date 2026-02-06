import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface SectionProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  primaryColor?: string;
}

export const CVSection: React.FC<SectionProps> = ({
  title,
  icon: Icon,
  children,
  className,
  primaryColor = "#1e40af",
}) => {
  return (
    <div className={cn("mt-4", className)}>
      <div
        className="flex items-center gap-2 mb-3 border-b-2 pb-1 w-full"
        style={{ borderColor: primaryColor }}
      >
        {Icon && (
          <Icon
            className="w-5 h-5"
            style={{ color: primaryColor, fill: `${primaryColor}20` }}
          />
        )}
        <h2
          className="text-xl font-bold uppercase tracking-wide"
          style={{ color: primaryColor }}
        >
          {title}
        </h2>
      </div>
      <div className="text-gray-700 leading-relaxed cv-content-rendered">
        {typeof children === "string" ? (
          <div dangerouslySetInnerHTML={{ __html: children }} />
        ) : (
          children
        )}
      </div>
    </div>
  );
};
