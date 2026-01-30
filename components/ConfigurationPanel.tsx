"use client";

import React from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Card } from "./ui/Card";
import { SizePresets } from "./SizePresets";

type AssetType = "image" | "video";

interface ConfigurationPanelProps {
  assetType: AssetType;
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  text: string;
  duration: number;
  fps: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onBackgroundColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
  onTextChange: (text: string) => void;
  onDurationChange: (duration: number) => void;
  onFpsChange: (fps: number) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  assetType,
  width,
  height,
  backgroundColor,
  textColor,
  text,
  duration,
  fps,
  onWidthChange,
  onHeightChange,
  onBackgroundColorChange,
  onTextColorChange,
  onTextChange,
  onDurationChange,
  onFpsChange,
}) => {
  const handlePresetSelect = (presetWidth: number, presetHeight: number) => {
    onWidthChange(presetWidth);
    onHeightChange(presetHeight);
  };

  return (
    <Card title="Configuration">
      <div className="space-y-6">
        <SizePresets onSelect={handlePresetSelect} />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Width"
            type="number"
            min="1"
            max="10000"
            value={width}
            onChange={(e) => onWidthChange(parseInt(e.target.value) || 1)}
          />
          <Input
            label="Height"
            type="number"
            min="1"
            max="10000"
            value={height}
            onChange={(e) => onHeightChange(parseInt(e.target.value) || 1)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bg-color">Background Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="bg-color"
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="h-10 w-20 p-1"
              />
              <Input
                type="text"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="text-color">Text Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="text-color"
                type="color"
                value={textColor}
                onChange={(e) => onTextColorChange(e.target.value)}
                className="h-10 w-20 p-1"
              />
              <Input
                type="text"
                value={textColor}
                onChange={(e) => onTextColorChange(e.target.value)}
                placeholder="#FFFFFF"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div>
          <Input
            label="Custom Text (optional)"
            type="text"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Leave empty for auto-generated dimensions"
          />
        </div>

        {assetType === "video" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Duration (seconds)"
                type="number"
                min="0.1"
                max="60"
                step="0.1"
                value={duration}
                onChange={(e) =>
                  onDurationChange(parseFloat(e.target.value) || 1)
                }
              />
              <Input
                label="FPS"
                type="number"
                min="1"
                max="60"
                value={fps}
                onChange={(e) => onFpsChange(parseInt(e.target.value) || 30)}
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
