import React from "react";
import { CVData, CVSettings, DEFAULT_SETTINGS, DEFAULT_SECTION_ORDER } from "../../../types/cv";
import { SettingsPanel } from "../SettingsPanel";
import { SectionManager } from "../SectionManager";

interface SettingsStepProps {
  cvData: CVData;
  updateSettings: (newSettings: CVSettings) => void;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const SettingsStep: React.FC<SettingsStepProps> = ({
  cvData,
  updateSettings,
  setCvData,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Settings Panel */}
      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <SettingsPanel
          settings={cvData.settings || DEFAULT_SETTINGS}
          onChange={updateSettings}
        />
      </div>

      {/* Section Manager */}
      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <SectionManager
          sectionOrder={cvData.sectionOrder || DEFAULT_SECTION_ORDER}
          hiddenSections={cvData.hiddenSections || []}
          onOrderChange={(newOrder) =>
            setCvData((prev) => ({ ...prev, sectionOrder: newOrder }))
          }
          onVisibilityChange={(hidden) =>
            setCvData((prev) => ({ ...prev, hiddenSections: hidden }))
          }
        />
      </div>
    </div>
  );
};
