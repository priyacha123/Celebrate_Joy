import { motion } from "framer-motion";
import { VIDEO_DURATIONS, VideoDuration } from "./MotionVideoPlayer";

interface VideoDurationPickerProps {
  selected: VideoDuration;
  onChange: (duration: VideoDuration) => void;
}

export const VideoDurationPicker = ({ selected, onChange }: VideoDurationPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {VIDEO_DURATIONS.map((opt) => (
        <motion.button
          key={opt.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-xl font-display font-semibold text-sm transition-all ${
            selected === opt.value
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {opt.label}
        </motion.button>
      ))}
    </div>
  );
};
