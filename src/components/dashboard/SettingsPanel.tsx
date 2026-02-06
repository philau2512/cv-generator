"use client";

import React from "react";
import { CVSettings, FONT_OPTIONS } from "../../types/cv";
import { Palette, Type, AlignJustify, Maximize2 } from "lucide-react";

interface SettingsPanelProps {
  settings: CVSettings;
  onChange: (settings: CVSettings) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onChange,
}) => {
  const updateSetting = <K extends keyof CVSettings>(
    key: K,
    value: CVSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
        <Palette className="w-4 h-4" /> Style Settings
      </h3>

      {/* Font Family */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5" /> Font Family
        </label>
        <select
          value={settings.fontFamily}
          onChange={(e) => updateSetting("fontFamily", e.target.value)}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        >
          {FONT_OPTIONS.map((font) => (
            <option key={font.name} value={font.name} className="text-gray-800 py-2">
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5 justify-between">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5" /> Font Size
          </span>
          <span className="text-blue-600 font-bold">{settings.fontSize}px</span>
        </label>
        <input
          type="range"
          min="10"
          max="18"
          step="1"
          value={settings.fontSize}
          onChange={(e) => updateSetting("fontSize", parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>10px</span>
          <span>18px</span>
        </div>
      </div>

      {/* Line Height */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5 justify-between">
          <span className="flex items-center gap-1.5">
            <AlignJustify className="w-3.5 h-3.5" /> Line Height
          </span>
          <span className="text-blue-600 font-bold">{settings.lineHeight}</span>
        </label>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={settings.lineHeight}
          onChange={(e) =>
            updateSetting("lineHeight", parseFloat(e.target.value))
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>Compact</span>
          <span>Spacious</span>
        </div>
      </div>

      {/* Primary Color */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" /> Accent Color
        </label>
        <div className="flex gap-2">
          {[
            "#1e40af",
            "#0f766e",
            "#7c3aed",
            "#be123c",
            "#c2410c",
            "#0369a1",
            "#374151",
          ].map((color) => (
            <button
              key={color}
              onClick={() => updateSetting("primaryColor", color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                settings.primaryColor === color
                  ? "border-gray-800 scale-110 ring-2 ring-offset-2 ring-gray-300"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={settings.primaryColor}
            onChange={(e) => updateSetting("primaryColor", e.target.value)}
            className="w-8 h-8 rounded-full cursor-pointer border-0 p-0 overflow-hidden"
            title="Custom color"
          />
        </div>
      </div>
    </div>
  );
};
