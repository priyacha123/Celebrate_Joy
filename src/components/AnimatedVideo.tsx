import { motion } from "framer-motion";
import { Sparkles } from "./Sparkles";
import { CardTemplate } from "@/data/celebrations";

interface AnimatedVideoProps {
  recipientName: string;
  senderName: string;
  message: string;
  celebration: string;
  emoji: string;
  template: CardTemplate;
  className?: string;
}

export const AnimatedVideo = ({
  recipientName,
  senderName,
  message,
  celebration,
  emoji,
  template,
  className = "",
}: AnimatedVideoProps) => {
  return (
    <div
      className={`relative w-[400px] h-[300px] rounded-2xl overflow-hidden shadow-2xl ${className}`}
    >
      <div className={`absolute inset-0 ${template.bgClass}`} />
      <Sparkles />

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center gap-3">
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="text-4xl"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        <motion.h2
          className={`text-2xl font-display font-bold ${template.textClass} drop-shadow-lg`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Happy {celebration}!
        </motion.h2>

        <motion.p
          className={`text-base ${template.textClass} drop-shadow`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {recipientName ? `To ${recipientName}` : "To You"} — {message || "Have an amazing day!"}
        </motion.p>

        <motion.p
          className={`text-sm ${template.textClass} opacity-80`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1 }}
        >
          — {senderName || "With Love"} 💕
        </motion.p>
      </div>
    </div>
  );
};
