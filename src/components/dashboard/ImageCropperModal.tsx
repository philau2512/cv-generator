"use client";

import React, { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "../../lib/cropImage";
import { X, ZoomIn, Scissors } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageCropperModalProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  image,
  onCropComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteInternal = (_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  };

  const handleSave = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        onCropComplete(croppedImage);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-[500px] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Adjust Profile Picture</h3>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Area cắt ảnh */}
          <div className="relative h-[400px] w-full bg-gray-900">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={3 / 4} // Tỷ lệ cân đối như bạn muốn
              onCropChange={onCropChange}
              onCropComplete={onCropCompleteInternal}
              onZoomChange={onZoomChange}
            />
          </div>

          {/* Controls */}
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
                <div className="flex items-center gap-2">
                  <ZoomIn className="w-4 h-4" />
                  <span>Zoom</span>
                </div>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all border border-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 border border-blue-700"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
