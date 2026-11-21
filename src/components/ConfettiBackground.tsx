import { useMemo } from "react";

const CONFETTI_COLORS = [
  "bg-celebration-pink",
  "bg-celebration-gold",
  "bg-celebration-teal",
  "bg-celebration-purple",
  "bg-celebration-orange",
  "bg-celebration-blue",
];

const SHAPES = ["rounded-full", "rounded-sm", "rounded-none"];

export const ConfettiBackground = () => {
  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${3 + Math.random() * 4}s`,
        size: `${6 + Math.random() * 10}px`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        shape: SHAPES[i % SHAPES.length],
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute animate-confetti ${piece.color} ${piece.shape} opacity-60`}
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
          }}
        />
      ))}
    </div>
  );
};
