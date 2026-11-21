import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardTemplate } from "@/data/celebrations";
import { celebrationVideos } from "@/assets/videos";
import {
  getCaptionText,
  CaptionLanguageCode,
  PlaybackSpeed,
  VideoTemplate,
} from "@/data/videoConfig";

export const VIDEO_DURATIONS = [
  { value: 30, label: "30 sec" },
  { value: 45, label: "45 sec" },
  { value: 60, label: "1 min" },
  { value: 90, label: "1 min 30 sec" },
] as const;

export type VideoDuration = (typeof VIDEO_DURATIONS)[number]["value"];

interface MotionVideoPlayerProps {
  recipientName: string;
  senderName: string;
  message: string;
  celebration: string;
  celebrationId: string;
  template: CardTemplate;
  duration: VideoDuration;
  className?: string;
  isPlaying?: boolean;
  captionsOn?: boolean;
  captionLang?: CaptionLanguageCode;
  speed?: PlaybackSpeed;
  uploadedMediaUrl?: string | null;
  uploadedMediaType?: "image" | "video" | null;
  videoTemplate?: VideoTemplate | null;
}

const getPhase = (progress: number) => {
  if (progress < 0.08) return "intro";
  if (progress < 0.25) return "greeting";
  if (progress < 0.5) return "message";
  if (progress < 0.75) return "celebration";
  if (progress < 0.9) return "sender";
  return "outro";
};

export const MotionVideoPlayer = ({
  recipientName,
  senderName,
  message,
  celebration,
  celebrationId,
  template,
  duration,
  className = "",
  isPlaying = true,
  captionsOn = true,
  captionLang = "en",
  speed = 1,
  uploadedMediaUrl = null,
  uploadedMediaType = null,
  videoTemplate = null,
}: MotionVideoPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [phase, setPhase] = useState("intro");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);
  const lastSpokenPhase = useRef<string>("");

  const videoSrc = celebrationVideos[celebrationId] || celebrationVideos["birthday"];

  // AI voice narration using Web Speech API
  const speak = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speed;
      utterance.lang = captionLang === "hi" ? "hi-IN" : captionLang === "es" ? "es-ES" : captionLang === "fr" ? "fr-FR" : captionLang === "de" ? "de-DE" : captionLang === "ja" ? "ja-JP" : captionLang === "ko" ? "ko-KR" : captionLang === "zh" ? "zh-CN" : captionLang === "ar" ? "ar-SA" : captionLang === "pt" ? "pt-BR" : captionLang === "ru" ? "ru-RU" : "en-US";

      // Pick a nice voice
      const voices = window.speechSynthesis.getVoices();
      const langVoice = voices.find((v) => v.lang.startsWith(utterance.lang.split("-")[0]));
      if (langVoice) utterance.voice = langVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [speed, captionLang]
  );

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = ((timestamp - startTimeRef.current) / 1000) * speed;
      const progress = Math.min(elapsed / duration, 1);

      setCurrentTime(elapsed);
      const newPhase = getPhase(progress);
      setPhase(newPhase);

      // Speak caption when phase changes
      if (captionsOn && newPhase !== lastSpokenPhase.current) {
        lastSpokenPhase.current = newPhase;
        const captionText = getCaptionText(newPhase, celebration, recipientName, senderName, message, captionLang);
        if (captionText) speak(captionText);
      }

      if (progress < 1 && isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    },
    [duration, isPlaying, speed, captionsOn, captionLang, celebration, recipientName, senderName, message, speak]
  );

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = null;
      lastSpokenPhase.current = "";
      animationRef.current = requestAnimationFrame(animate);
      if (videoRef.current) {
        videoRef.current.playbackRate = speed;
        videoRef.current.play();
      }
    } else {
      window.speechSynthesis.cancel();
      videoRef.current?.pause();
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.speechSynthesis.cancel();
    };
  }, [animate, isPlaying, speed]);

  useEffect(() => {
    setCurrentTime(0);
    startTimeRef.current = null;
    lastSpokenPhase.current = "";
  }, [duration]);

  // Update video playback rate
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  }, [speed]);

  const progress = currentTime / duration;
  const captionText = getCaptionText(phase, celebration, recipientName, senderName, message, captionLang);

  const overlayClass = videoTemplate?.overlayClass || "bg-black/40";
  const textPositionClass =
    videoTemplate?.textPosition === "top"
      ? "justify-start pt-10"
      : videoTemplate?.textPosition === "bottom"
        ? "justify-end pb-10"
        : "justify-center";

  return (
    <div
      className={`relative w-[480px] h-[270px] rounded-2xl overflow-hidden shadow-2xl ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      {/* Background media */}
      {uploadedMediaUrl && uploadedMediaType === "image" ? (
        <img src={uploadedMediaUrl} className="absolute inset-0 w-full h-full object-cover" alt="Uploaded media" />
      ) : uploadedMediaUrl && uploadedMediaType === "video" ? (
        <video
          src={uploadedMediaUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop muted playsInline autoPlay={isPlaying}
        />
      ) : (
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          loop muted playsInline autoPlay={isPlaying}
        />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClass}`} />

      {/* Text overlays */}
      <div className={`relative z-10 flex flex-col items-center h-full p-6 ${textPositionClass}`}>
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div key="intro" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }} transition={{ type: "spring", stiffness: 200 }} className="text-center">
              <motion.p className={videoTemplate?.textStyle || "text-4xl font-display font-bold text-white drop-shadow-lg"} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                ✨
              </motion.p>
            </motion.div>
          )}

          {phase === "greeting" && (
            <motion.div key="greeting" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ type: "spring", stiffness: 120 }} className="text-center">
              <motion.h2 className={videoTemplate?.textStyle || "text-3xl font-display font-bold text-white drop-shadow-lg"} animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                Happy {celebration}!
              </motion.h2>
              <motion.p className="text-lg text-white/90 mt-2 font-body drop-shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                {recipientName ? `Dear ${recipientName}` : "Dear Friend"}
              </motion.p>
            </motion.div>
          )}

          {phase === "message" && (
            <motion.div key="message" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6 }} className="text-center max-w-md px-4">
              <motion.p className="text-xl text-white font-body leading-relaxed drop-shadow-lg">
                "{message || "Wishing you all the happiness in the world on this special day!"}"
              </motion.p>
              <motion.div className="h-0.5 bg-white/50 mx-auto mt-4 rounded-full" initial={{ width: 0 }} animate={{ width: "50%" }} transition={{ delay: 0.8, duration: 0.6 }} />
            </motion.div>
          )}

          {phase === "celebration" && (
            <motion.div key="celebration" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.3, opacity: 0 }} className="text-center">
              <motion.h2 className={videoTemplate?.textStyle || "text-4xl font-display font-bold text-white drop-shadow-lg"} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                Happy {celebration}!
              </motion.h2>
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-white" style={{ left: "50%", top: "50%" }} initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos((i * 45 * Math.PI) / 180) * 100, y: Math.sin((i * 45 * Math.PI) / 180) * 80, opacity: 0, scale: 0 }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeOut" }} />
              ))}
            </motion.div>
          )}

          {phase === "sender" && (
            <motion.div key="sender" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="text-center">
              <motion.p className="text-lg text-white/90 font-body drop-shadow">With love,</motion.p>
              <motion.p className={videoTemplate?.textStyle || "text-3xl font-display font-bold text-white drop-shadow-lg mt-1"} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                {senderName || "Your Friend"}
              </motion.p>
            </motion.div>
          )}

          {phase === "outro" && (
            <motion.div key="outro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <motion.p className={videoTemplate?.textStyle || "text-2xl font-display font-bold text-white drop-shadow-lg"} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                ✨ {celebration} ✨
              </motion.p>
              <p className="text-sm text-white/70 mt-2 font-body">Made with love</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Caption bar */}
      {captionsOn && captionText && (
        <motion.div
          key={phase + captionLang}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-4 right-4 z-20"
        >
          <div className="bg-black/70 backdrop-blur-sm text-white text-center px-4 py-2 rounded-lg">
            <p className="text-xs font-body leading-relaxed">{captionText}</p>
          </div>
        </motion.div>
      )}

      {/* Speaking indicator */}
      {isSpeaking && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full">
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-white rounded-full"
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <span className="text-[9px] text-white/80 font-body">AI Voice</span>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-20">
        <motion.div className="h-full bg-white/70" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Time + Speed display */}
      <div className="absolute bottom-2 right-3 z-20 text-xs text-white/70 font-mono flex items-center gap-2">
        {speed !== 1 && <span className="bg-white/20 px-1 rounded text-[10px]">{speed}x</span>}
        {Math.floor(currentTime)}s / {duration}s
      </div>
    </div>
  );
};
