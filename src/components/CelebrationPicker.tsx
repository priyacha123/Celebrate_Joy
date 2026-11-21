import { motion } from "framer-motion";
import { celebrations, Celebration } from "@/data/celebrations";

interface CelebrationPickerProps {
  selected: Celebration | null;
  onSelect: (celebration: Celebration) => void;
}

export const CelebrationPicker = ({ selected, onSelect }: CelebrationPickerProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {celebrations.map((c, i) => (
        <motion.button
          key={c.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: "spring" }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(c)}
          className={`relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
            selected?.id === c.id
              ? `border-primary shadow-lg ${c.bgColor} text-white`
              : "border-border bg-card hover:border-primary/40 hover:shadow-md"
          }`}
        >
          <div className="text-4xl mb-2">{c.emoji}</div>
          <h3 className="font-display font-bold text-sm">{c.name}</h3>
          <p
            className={`text-xs mt-1 ${
              selected?.id === c.id ? "opacity-80" : "text-muted-foreground"
            }`}
          >
            {c.description}
          </p>
          {selected?.id === c.id && (
            <motion.div
              layoutId="selected-ring"
              className="absolute inset-0 rounded-2xl border-2 border-white/30"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
