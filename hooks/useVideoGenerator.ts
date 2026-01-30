import { useRef, useCallback, useState } from "react";

interface VideoConfig {
  width: number;
  height: number;
  duration: number; // in seconds
  fps?: number;
  backgroundColor: string;
  textColor: string;
  text?: string;
}

export const useVideoGenerator = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number | null>(null);

  const generateVideo = useCallback((config: VideoConfig): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = config.width;
      canvas.height = config.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      const fps = config.fps || 30;
      const totalFrames = config.duration * fps;
      let currentFrame = 0;
      chunksRef.current = [];

      // Get media stream from canvas
      const stream = canvas.captureStream(fps);

      // Set up MediaRecorder
      const options: MediaRecorderOptions = {
        mimeType: "video/webm;codecs=vp9",
        videoBitsPerSecond: 2500000,
      };

      // Fallback to VP8 if VP9 is not supported
      let mediaRecorder: MediaRecorder;
      try {
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e) {
        const fallbackOptions: MediaRecorderOptions = {
          mimeType: "video/webm;codecs=vp8",
        };
        try {
          mediaRecorder = new MediaRecorder(stream, fallbackOptions);
        } catch (e2) {
          reject(new Error("MediaRecorder is not supported in this browser"));
          return;
        }
      }

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        resolve(blob);
      };

      mediaRecorder.onerror = (event) => {
        reject(new Error("MediaRecorder error"));
      };

      // Start recording
      mediaRecorder.start(100); // Collect data every 100ms

      // Animation loop
      const animate = () => {
        if (currentFrame >= totalFrames) {
          mediaRecorder.stop();
          return;
        }

        // Clear canvas
        ctx.fillStyle = config.backgroundColor;
        ctx.fillRect(0, 0, config.width, config.height);

        // Draw text
        const displayText = config.text || `${config.width} × ${config.height}`;
        ctx.fillStyle = config.textColor;
        ctx.font = `bold ${Math.min(config.width, config.height) / 8}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(displayText, config.width / 2, config.height / 2 - 30);

        // Draw timer
        const elapsed = currentFrame / fps;
        const timerText = `${elapsed.toFixed(1)}s / ${config.duration}s`;
        ctx.fillStyle = config.textColor;
        ctx.font = `bold ${Math.min(config.width, config.height) / 12}px Arial`;
        ctx.fillText(timerText, config.width / 2, config.height / 2 + 30);

        // Draw progress bar
        const progress = currentFrame / totalFrames;
        const barWidth = config.width * 0.6;
        const barHeight = 8;
        const barX = (config.width - barWidth) / 2;
        const barY = config.height / 2 + 60;

        ctx.fillStyle = config.textColor;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(barX, barY, barWidth, barHeight);
        ctx.globalAlpha = 1.0;
        ctx.fillRect(barX, barY, barWidth * progress, barHeight);

        currentFrame++;
        requestAnimationFrame(animate);
      };

      animate();
    });
  }, []);

  const downloadVideo = useCallback(
    async (config: VideoConfig, filename?: string) => {
      try {
        setIsRecording(true);
        setProgress(0);

        const blob = await generateVideo(config);

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download =
          filename ||
          `placeholder-${config.width}x${config.height}-${config.duration}s.webm`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setIsRecording(false);
        setProgress(0);
      } catch (error) {
        console.error("Error downloading video:", error);
        setIsRecording(false);
        setProgress(0);
        throw error;
      }
    },
    [generateVideo],
  );

  const getVideoBlob = useCallback(
    async (config: VideoConfig): Promise<Blob> => {
      setIsRecording(true);
      try {
        const blob = await generateVideo(config);
        setIsRecording(false);
        return blob;
      } catch (error) {
        setIsRecording(false);
        throw error;
      }
    },
    [generateVideo],
  );

  return {
    generateVideo,
    downloadVideo,
    getVideoBlob,
    isRecording,
    progress,
    canvasRef,
  };
};
