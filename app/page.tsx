"use client";

import React, { useState } from "react";
import { AssetTypeSelector } from "@/components/AssetTypeSelector";
import { ConfigurationPanel } from "@/components/ConfigurationPanel";
import { PreviewDisplay } from "@/components/PreviewDisplay";
import { Button } from "@/components/ui/Button";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { useVideoGenerator } from "@/hooks/useVideoGenerator";

type AssetType = "image" | "video";

export default function Home() {
  const [assetType, setAssetType] = useState<AssetType>("image");
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(960);
  const [backgroundColor, setBackgroundColor] = useState("#4A90E2");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [text, setText] = useState("");
  const [duration, setDuration] = useState(5);
  const [fps, setFps] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);

  const { downloadImage } = useImageGenerator();
  const { downloadVideo, isRecording } = useVideoGenerator();

  const handleGenerate = async () => {
    // Validate inputs
    if (width < 1 || height < 1) {
      alert("Width and height must be at least 1 pixel");
      return;
    }
    if (width > 10000 || height > 10000) {
      alert("Width and height cannot exceed 10000 pixels");
      return;
    }
    if (assetType === "video" && (duration < 0.1 || duration > 60)) {
      alert("Duration must be between 0.1 and 60 seconds");
      return;
    }
    if (assetType === "video" && (fps < 1 || fps > 60)) {
      alert("FPS must be between 1 and 60");
      return;
    }

    setIsGenerating(true);
    try {
      if (assetType === "image") {
        await downloadImage({
          width,
          height,
          backgroundColor,
          textColor,
          text: text || undefined,
        });
      } else {
        await downloadVideo({
          width,
          height,
          duration,
          fps,
          backgroundColor,
          textColor,
          text: text || undefined,
        });
      }
    } catch (error) {
      console.error("Generation error:", error);
      alert("Failed to generate asset. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Placeholder Asset Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate custom placeholder images and videos for web development
          </p>
        </header>

        <div className="mb-6 flex justify-center">
          <AssetTypeSelector assetType={assetType} onChange={setAssetType} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ConfigurationPanel
            assetType={assetType}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            textColor={textColor}
            text={text}
            duration={duration}
            fps={fps}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
            onBackgroundColorChange={setBackgroundColor}
            onTextColorChange={setTextColor}
            onTextChange={setText}
            onDurationChange={setDuration}
            onFpsChange={setFps}
          />

          <PreviewDisplay
            assetType={assetType}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            textColor={textColor}
            text={text}
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || isRecording}
            size="lg"
            className="min-w-[200px]"
          >
            {isGenerating || isRecording
              ? assetType === "image"
                ? "Generating..."
                : "Recording..."
              : `Generate ${assetType === "image" ? "Image" : "Video"}`}
          </Button>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            All processing happens in your browser. No data is sent to any
            server.
          </p>
        </footer>
      </div>
    </div>
  );
}
