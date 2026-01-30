"use client";

import React from "react";
import { Button } from "./ui/Button";

interface SizePreset {
  name: string;
  width: number;
  height: number;
}

const PRESETS: SizePreset[] = [
  { name: "HD", width: 1280, height: 720 },
  { name: "Full HD", width: 1920, height: 1080 },
  { name: "4K", width: 3840, height: 2160 },
  { name: "Square", width: 500, height: 500 },
  { name: "Instagram Story", width: 1080, height: 1920 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "Facebook Cover", width: 1200, height: 630 },
  { name: "Twitter Header", width: 1500, height: 500 },
];

interface SizePresetsProps {
  onSelect: (width: number, height: number) => void;
}

export const SizePresets: React.FC<SizePresetsProps> = ({ onSelect }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Quick Presets
      </label>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            size="sm"
            onClick={() => onSelect(preset.width, preset.height)}
            className="text-xs"
          >
            {preset.name}
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              ({preset.width}×{preset.height})
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
