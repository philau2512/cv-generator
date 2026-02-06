import React from "react";
import { Check, Printer, Download } from "lucide-react";
import { CVData } from "../../../types/cv";
import { RichTextEditor } from "../RichTextEditor";

interface FinalizeStepProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
  handlePrint: () => void;
  exportJSON: () => void;
}

export const FinalizeStep: React.FC<FinalizeStepProps> = ({
  cvData,
  setCvData,
  handlePrint,
  exportJSON,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 text-center space-y-4">
        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-200">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Final Review</h2>
        <p className="text-gray-600 text-sm">
          Check your Interests and Projects before printing.
        </p>
      </div>

      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
        Interests & Hobbies
      </h2>
      <RichTextEditor
        value={cvData.interests}
        onChange={(val) => setCvData((prev) => ({ ...prev, interests: val }))}
      />

      <div className="grid grid-cols-1 gap-3 mt-6">
        <button
          onClick={handlePrint}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Printer className="w-5 h-5" /> Print to PDF (A4)
        </button>
        <button
          onClick={exportJSON}
          className="w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
        >
          <Download className="w-5 h-5" /> Export as JSON
        </button>
      </div>
    </div>
  );
};
