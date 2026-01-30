"use client";

import React from "react";

type AssetType = "image" | "video";

interface AssetTypeSelectorProps {
  assetType: AssetType;
  onChange: (type: AssetType) => void;
}

export const AssetTypeSelector: React.FC<AssetTypeSelectorProps> = ({
  assetType,
  onChange,
}) => {
  return (
    <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <button
        onClick={() => onChange("image")}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${
            assetType === "image"
              ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }
        `}
      >
        Image
      </button>
      <button
        onClick={() => onChange("video")}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${
            assetType === "video"
              ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }
        `}
      >
        Video
      </button>
    </div>
  );
};
