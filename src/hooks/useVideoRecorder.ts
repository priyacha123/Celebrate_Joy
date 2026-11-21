import { useRef, useState, useCallback } from "react";
import { toast } from "sonner";

export const useVideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(
    async (
      element: HTMLElement,
      durationMs: number,
      filename: string
    ): Promise<void> => {
      return new Promise(async (resolve, reject) => {
        try {
          // Use html2canvas approach with MediaRecorder
          const canvas = document.createElement("canvas");
          const rect = element.getBoundingClientRect();
          canvas.width = rect.width * 2; // 2x for quality
          canvas.height = rect.height * 2;
          const ctx = canvas.getContext("2d")!;

          const stream = canvas.captureStream(30); // 30 FPS
          const mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm;codecs=vp9",
            videoBitsPerSecond: 5000000,
          });

          mediaRecorderRef.current = mediaRecorder;
          chunksRef.current = [];
          setIsRecording(true);
          setRecordingProgress(0);

          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunksRef.current.push(e.data);
            }
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
            setIsRecording(false);
            setRecordingProgress(0);
            toast.success("Video downloaded successfully! 🎬");
            resolve();
          };

          mediaRecorder.onerror = (e) => {
            setIsRecording(false);
            reject(e);
          };

          mediaRecorder.start(100); // Collect data every 100ms

          const startTime = Date.now();
          const fps = 30;
          const frameInterval = 1000 / fps;

          const captureFrame = async () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            setRecordingProgress(progress * 100);

            if (elapsed < durationMs && mediaRecorderRef.current?.state === "recording") {
              // Capture frame using html-to-image
              try {
                const { toPng } = await import("html-to-image");
                const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });
                const img = new Image();
                img.onload = () => {
                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = dataUrl;
              } catch {
                // Simple fallback gradient
                ctx.fillStyle = "#667eea";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              }

              setTimeout(captureFrame, frameInterval);
            } else {
              mediaRecorder.stop();
            }
          };

          captureFrame();
        } catch (error) {
          setIsRecording(false);
          toast.error("Failed to record video. Please try again.");
          reject(error);
        }
      });
    },
    []
  );

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  return {
    isRecording,
    recordingProgress,
    startRecording,
    stopRecording,
  };
};
