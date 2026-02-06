import React from "react";
import {
  User,
  GraduationCap,
  Lightbulb,
  Briefcase,
  FolderGit2,
  Trophy,
  Heart,
  LucideIcon,
} from "lucide-react";
import { CVData, FONT_OPTIONS } from "../../types/cv";
import { CVHeader } from "./Header";
import { CVSection } from "./Section";
import { CVExperience } from "./Experience";
import { CVProject } from "./Project";

interface CVPreviewProps {
  data: CVData;
}

const SECTION_CONFIG: Record<string, { title: string; icon: LucideIcon }> = {
  objective: { title: "OBJECTIVE", icon: User },
  education: { title: "EDUCATION", icon: GraduationCap },
  skills: { title: "SKILLS", icon: Lightbulb },
  experience: { title: "EXPERIENCE", icon: Briefcase },
  projects: { title: "PROJECTS", icon: FolderGit2 },
  achievements: { title: "ACHIEVEMENTS AND AWARDS", icon: Trophy },
  interests: { title: "INTEREST", icon: Heart },
};

export const CVPreview = React.forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data }, ref) => {
    // Fallback to defaults if settings are missing (old data structure)
    const settings = data.settings || {
      fontFamily: "Inter",
      fontSize: 14,
      lineHeight: 1.5,
      primaryColor: "#1e40af",
    };
    const sectionOrder = data.sectionOrder || [
      "objective",
      "education",
      "skills",
      "experience",
      "projects",
      "achievements",
      "interests",
    ];
    const hiddenSections = data.hiddenSections || [];

    // Get font family value
    const fontFamily =
      FONT_OPTIONS.find((f) => f.name === settings.fontFamily)?.value ||
      "Inter, sans-serif";

    // Dynamic styles using CSS custom properties for better cascade
    const dynamicStyles: React.CSSProperties = {
      "--cv-font-family": fontFamily,
      "--cv-font-size": `${settings.fontSize}px`,
      "--cv-line-height": String(settings.lineHeight),
      "--cv-primary-color": settings.primaryColor,
      fontFamily: fontFamily,
    } as React.CSSProperties;

    const renderSection = (sectionKey: string) => {
      if (hiddenSections.includes(sectionKey)) return null;

      const config = SECTION_CONFIG[sectionKey];
      if (!config) return null;

      switch (sectionKey) {
        case "objective":
          return (
            <CVSection
              key={sectionKey}
              title={config.title}
              icon={config.icon}
              primaryColor={settings.primaryColor}
            >
              <div dangerouslySetInnerHTML={{ __html: data.objective }} />
            </CVSection>
          );

        case "education":
          return (
            <CVSection
              key={sectionKey}
              title={config.title}
              icon={config.icon}
              primaryColor={settings.primaryColor}
            >
              <ul className="space-y-1.5 list-disc ml-4.5">
                {data.education.map((edu, index) => (
                  <li key={index} className="text-gray-900 pl-1 marker:text-gray-900">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold leading-tight uppercase relative -left-[1px]">
                          {edu.school}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{ __html: edu.major }}
                          className="ml-0 mt-1"
                        />
                      </div>
                      <span
                        className="font-semibold text-sm shrink-0 ml-4 pt-0.5"
                        style={{ color: settings.primaryColor }}
                      >
                        {edu.duration}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CVSection>
          );

        case "skills":
          return (
            <CVSection
              key={sectionKey}
              title={config.title}
              icon={config.icon}
              primaryColor={settings.primaryColor}
            >
              <div dangerouslySetInnerHTML={{ __html: data.skills }} />
            </CVSection>
          );

        case "experience":
          return (
            <CVSection
              key={sectionKey}
              title={config.title}
              icon={config.icon}
              primaryColor={settings.primaryColor}
            >
              <CVExperience
                items={data.experience}
                primaryColor={settings.primaryColor}
              />
            </CVSection>
          );

        case "projects":
          return (
            <CVSection
              key={sectionKey}
              title={config.title}
              icon={config.icon}
              primaryColor={settings.primaryColor}
            >
              <CVProject items={data.projects} />
            </CVSection>
          );

        case "achievements":
          return (
            <CVSection
              key={sectionKey}
              title={config.title}
              icon={config.icon}
              primaryColor={settings.primaryColor}
            >
              <ul className="space-y-2 list-disc ml-4.5">
                {data.achievements.map((ach, index) => (
                  <li key={index} className="text-gray-900 pl-1 marker:text-gray-900">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold uppercase relative -left-[1px]">
                        {ach.title}
                      </span>
                      <span
                        style={{ color: settings.primaryColor }}
                        className="font-semibold text-sm shrink-0 ml-4"
                      >
                        {ach.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CVSection>
          );

        case "interests":
          return (
            <CVSection
              key={sectionKey}
              title={config.title}
              icon={config.icon}
              primaryColor={settings.primaryColor}
            >
              <div dangerouslySetInnerHTML={{ __html: data.interests }} />
            </CVSection>
          );

        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className="bg-white w-[210mm] min-h-[297mm] p-[15mm] mx-auto shadow-2xl print:shadow-none print:m-0 print:p-[10mm] text-gray-800"
        id="cv-preview-content"
        style={dynamicStyles}
      >
        <CVHeader
          data={data.personalInfo}
          primaryColor={settings.primaryColor}
        />

        {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
      </div>
    );
  },
);

CVPreview.displayName = "CVPreview";
