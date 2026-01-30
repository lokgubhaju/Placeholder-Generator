import { useRef, useCallback } from "react";

interface ImageConfig {
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  text?: string;
}

export const useImageGenerator = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateImage = useCallback((config: ImageConfig): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = config.width;
      canvas.height = config.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Fill background
      ctx.fillStyle = config.backgroundColor;
      ctx.fillRect(0, 0, config.width, config.height);

      // Draw text
      const displayText = config.text || `${config.width} × ${config.height}`;
      ctx.fillStyle = config.textColor;
      ctx.font = `bold ${Math.min(config.width, config.height) / 8}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(displayText, config.width / 2, config.height / 2);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to generate image blob"));
          }
        },
        "image/png",
        1.0,
      );
    });
  }, []);

  const downloadImage = useCallback(
    async (config: ImageConfig, filename?: string) => {
      try {
        const blob = await generateImage(config);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download =
          filename || `placeholder-${config.width}x${config.height}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
        throw error;
      }
    },
    [generateImage],
  );

  const getImageDataUrl = useCallback(
    async (config: ImageConfig): Promise<string> => {
      const canvas = document.createElement("canvas");
      canvas.width = config.width;
      canvas.height = config.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Fill background
      ctx.fillStyle = config.backgroundColor;
      ctx.fillRect(0, 0, config.width, config.height);

      // Draw text
      const displayText = config.text || `${config.width} × ${config.height}`;
      ctx.fillStyle = config.textColor;
      ctx.font = `bold ${Math.min(config.width, config.height) / 8}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(displayText, config.width / 2, config.height / 2);

      return canvas.toDataURL("image/png");
    },
    [],
  );

  return {
    generateImage,
    downloadImage,
    getImageDataUrl,
    canvasRef,
  };
};
