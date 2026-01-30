"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./ui/Card";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import Image from "next/image";

type AssetType = "image" | "video";

interface PreviewDisplayProps {
  assetType: AssetType;
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  text: string;
}

export const PreviewDisplay: React.FC<PreviewDisplayProps> = ({
  assetType,
  width,
  height,
  backgroundColor,
  textColor,
  text,
}) => {
  const { getImageDataUrl } = useImageGenerator();
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (assetType === "image") {
      getImageDataUrl({
        width,
        height,
        backgroundColor,
        textColor,
        text: text || undefined,
      }).then(setPreviewUrl);
    }
  }, [
    assetType,
    width,
    height,
    backgroundColor,
    textColor,
    text,
    getImageDataUrl,
  ]);

  const maxPreviewSize = 600;
  const aspectRatio = width / height;
  let previewWidth = width;
  let previewHeight = height;

  if (width > maxPreviewSize || height > maxPreviewSize) {
    if (aspectRatio > 1) {
      previewWidth = maxPreviewSize;
      previewHeight = maxPreviewSize / aspectRatio;
    } else {
      previewHeight = maxPreviewSize;
      previewWidth = maxPreviewSize * aspectRatio;
    }
  }

  return (
    <Card title="Preview">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center"
          style={{
            width: `${previewWidth}px`,
            height: `${previewHeight}px`,
            maxWidth: "100%",
            maxHeight: "70vh",
          }}
        >
          {assetType === "image" && previewUrl ? (
            <Image
              alt="Preview"
              className="max-w-full max-h-full"
              style={{
                width: `${previewWidth}px`,
                height: `${previewHeight}px`,
                objectFit: "contain",
              }}
              src={previewUrl}
              width={previewWidth}
              height={previewHeight}
            />
          ) : assetType === "video" ? (
            <div
              className="flex items-center justify-center"
              style={{
                width: `${previewWidth}px`,
                height: `${previewHeight}px`,
                backgroundColor,
                color: textColor,
              }}
            >
              <div className="text-center p-4">
                <div className="text-2xl font-bold mb-2">
                  {text || `${width} × ${height}`}
                </div>
                <div className="text-sm opacity-75">Video preview</div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400">Loading preview...</div>
          )}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Dimensions: {width} × {height} pixels
        </div>
      </div>
    </Card>
  );
};
