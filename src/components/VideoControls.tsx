import { motion } from "framer-motion";
import { Subtitles, MessageSquareOff, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CAPTION_LANGUAGES,
  CaptionLanguageCode,
  PLAYBACK_SPEEDS,
  PlaybackSpeed,
} from "@/data/videoConfig";
import { useState, useRef, useEffect } from "react";

interface VideoControlsProps {
  captionsOn: boolean;
  onCaptionsToggle: () => void;
  captionLang: CaptionLanguageCode;
  onLangChange: (lang: CaptionLanguageCode) => void;
  speed: PlaybackSpeed;
  onSpeedChange: (speed: PlaybackSpeed) => void;
}

export const VideoControls = ({
  captionsOn,
  onCaptionsToggle,
  captionLang,
  onLangChange,
  speed,
  onSpeedChange,
}: VideoControlsProps) => {
  const [langOpen, setLangOpen] = useState(false);
  const [speedOpen, setSpeedOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (speedRef.current && !speedRef.current.contains(e.target as Node)) setSpeedOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = CAPTION_LANGUAGES.find((l) => l.code === captionLang);

  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {/* Caption toggle */}
      <Button
        size="sm"
        variant={captionsOn ? "default" : "outline"}
        onClick={onCaptionsToggle}
        className="gap-1.5 rounded-lg text-xs h-8"
      >
        {captionsOn ? (
          <Subtitles className="w-3.5 h-3.5" />
        ) : (
          <MessageSquareOff className="w-3.5 h-3.5" />
        )}
        CC {captionsOn ? "ON" : "OFF"}
      </Button>

      {/* Language dropdown */}
      <div className="relative" ref={langRef}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setLangOpen(!langOpen)}
          className="gap-1 rounded-lg text-xs h-8"
          disabled={!captionsOn}
        >
          {currentLang?.flag} {currentLang?.name}
          <ChevronDown className="w-3 h-3" />
        </Button>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full mb-1 left-0 bg-card border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto w-44"
          >
            {CAPTION_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLangChange(lang.code);
                  setLangOpen(false);
                }}
                className={`w-full px-3 py-1.5 text-left text-xs font-body flex items-center gap-2 hover:bg-muted transition-colors ${
                  captionLang === lang.code ? "bg-primary/10 text-primary" : "text-foreground"
                }`}
              >
                <span>{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Speed dropdown */}
      <div className="relative" ref={speedRef}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSpeedOpen(!speedOpen)}
          className="gap-1 rounded-lg text-xs h-8 min-w-[60px]"
        >
          {speed}x
          <ChevronDown className="w-3 h-3" />
        </Button>
        {speedOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full mb-1 left-0 bg-card border border-border rounded-lg shadow-lg z-50"
          >
            {PLAYBACK_SPEEDS.map((s) => (
              <button
                key={s.value}
                onClick={() => {
                  onSpeedChange(s.value);
                  setSpeedOpen(false);
                }}
                className={`w-full px-4 py-1.5 text-xs font-body text-left hover:bg-muted transition-colors ${
                  speed === s.value ? "bg-primary/10 text-primary" : "text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
