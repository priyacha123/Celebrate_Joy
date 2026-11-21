import { motion } from "framer-motion";
import { Sparkles } from "./Sparkles";
import { CardTemplate } from "@/data/celebrations";

interface CelebrationCardProps {
  recipientName: string;
  senderName: string;
  message: string;
  celebration: string;
  emoji: string;
  template: CardTemplate;
  className?: string;
}

/* ─── SVG pattern / decoration layers per style ─── */

const FloralLayer = () => (
  <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 400 560">
    {/* Corner floral swirls */}
    <circle cx="40" cy="40" r="30" fill="none" stroke="hsl(340,50%,70%)" strokeWidth="1" />
    <circle cx="40" cy="40" r="18" fill="none" stroke="hsl(340,50%,70%)" strokeWidth="0.5" />
    <path d="M20,20 Q40,5 60,20 Q75,40 60,60 Q40,75 20,60 Q5,40 20,20Z" fill="none" stroke="hsl(340,40%,65%)" strokeWidth="0.8" />
    <circle cx="360" cy="40" r="30" fill="none" stroke="hsl(340,50%,70%)" strokeWidth="1" />
    <path d="M340,20 Q360,5 380,20 Q395,40 380,60 Q360,75 340,60 Q325,40 340,20Z" fill="none" stroke="hsl(340,40%,65%)" strokeWidth="0.8" />
    <circle cx="40" cy="520" r="30" fill="none" stroke="hsl(340,50%,70%)" strokeWidth="1" />
    <path d="M20,500 Q40,485 60,500 Q75,520 60,540 Q40,555 20,540 Q5,520 20,500Z" fill="none" stroke="hsl(340,40%,65%)" strokeWidth="0.8" />
    <circle cx="360" cy="520" r="30" fill="none" stroke="hsl(340,50%,70%)" strokeWidth="1" />
    {/* Vine lines */}
    <path d="M0,140 Q100,120 200,140 Q300,160 400,140" fill="none" stroke="hsl(150,30%,50%)" strokeWidth="0.6" opacity="0.5" />
    <path d="M0,420 Q100,440 200,420 Q300,400 400,420" fill="none" stroke="hsl(150,30%,50%)" strokeWidth="0.6" opacity="0.5" />
    {/* Scattered petals */}
    {[80, 180, 300, 350].map((x, i) => (
      <ellipse key={i} cx={x} cy={100 + i * 120} rx="6" ry="12" fill="hsl(340,40%,65%)" opacity="0.2" transform={`rotate(${30 + i * 45} ${x} ${100 + i * 120})`} />
    ))}
  </svg>
);

const GeometricLayer = () => (
  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 560">
    {/* Diamond grid pattern */}
    {Array.from({ length: 6 }).map((_, i) =>
      Array.from({ length: 4 }).map((_, j) => (
        <polygon
          key={`${i}-${j}`}
          points={`${60 + j * 80},${40 + i * 90 - 20} ${60 + j * 80 + 20},${40 + i * 90} ${60 + j * 80},${40 + i * 90 + 20} ${60 + j * 80 - 20},${40 + i * 90}`}
          fill="none"
          stroke="hsl(45,60%,55%)"
          strokeWidth="0.8"
        />
      ))
    )}
    {/* Border lines */}
    <rect x="15" y="15" width="370" height="530" rx="8" fill="none" stroke="hsl(45,60%,55%)" strokeWidth="1.2" />
    <rect x="25" y="25" width="350" height="510" rx="4" fill="none" stroke="hsl(45,60%,55%)" strokeWidth="0.5" />
    {/* Corner triangles */}
    <polygon points="15,15 55,15 15,55" fill="hsl(45,60%,55%)" opacity="0.15" />
    <polygon points="385,15 345,15 385,55" fill="hsl(45,60%,55%)" opacity="0.15" />
    <polygon points="15,545 55,545 15,505" fill="hsl(45,60%,55%)" opacity="0.15" />
    <polygon points="385,545 345,545 385,505" fill="hsl(45,60%,55%)" opacity="0.15" />
  </svg>
);

const GradientBurstLayer = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(350,65%,48%)] via-[hsl(20,80%,50%)] to-[hsl(45,85%,55%)]" />
    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(350,50%,20%)/60%] to-transparent" />
    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 560">
      {/* Radial burst lines from center */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1="200" y1="280"
            x2={200 + Math.cos(rad) * 300}
            y2={280 + Math.sin(rad) * 300}
            stroke="hsl(0,0%,100%)"
            strokeWidth="0.6"
          />
        );
      })}
      <circle cx="200" cy="280" r="60" fill="none" stroke="hsl(0,0%,100%)" strokeWidth="0.5" />
      <circle cx="200" cy="280" r="120" fill="none" stroke="hsl(0,0%,100%)" strokeWidth="0.3" />
    </svg>
  </>
);

const ArtDecoLayer = () => (
  <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" viewBox="0 0 400 560">
    {/* Art deco fan shapes at top */}
    <path d="M200,0 L120,80 L280,80 Z" fill="none" stroke="hsl(45,60%,55%)" strokeWidth="1" />
    <path d="M200,0 L150,60 L250,60 Z" fill="none" stroke="hsl(45,60%,55%)" strokeWidth="0.6" />
    <path d="M200,0 L175,40 L225,40 Z" fill="hsl(45,60%,55%)" opacity="0.1" />
    {/* Vertical pillars */}
    <rect x="30" y="80" width="3" height="400" fill="hsl(45,60%,55%)" opacity="0.3" />
    <rect x="367" y="80" width="3" height="400" fill="hsl(45,60%,55%)" opacity="0.3" />
    {/* Horizontal lines */}
    <line x1="30" y1="80" x2="370" y2="80" stroke="hsl(45,60%,55%)" strokeWidth="1.5" />
    <line x1="30" y1="480" x2="370" y2="480" stroke="hsl(45,60%,55%)" strokeWidth="1.5" />
    {/* Stepped corners */}
    {[0, 1, 2].map(i => (
      <g key={i}>
        <rect x={30 + i * 8} y={80 + i * 8} width={340 - i * 16} height={400 - i * 16} rx="0" fill="none" stroke="hsl(45,60%,55%)" strokeWidth="0.4" />
      </g>
    ))}
    {/* Bottom fan */}
    <path d="M200,560 L120,480 L280,480 Z" fill="none" stroke="hsl(45,60%,55%)" strokeWidth="1" />
    <path d="M200,560 L150,500 L250,500 Z" fill="none" stroke="hsl(45,60%,55%)" strokeWidth="0.6" />
  </svg>
);

const WatercolorLayer = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(200,35%,88%)] via-[hsl(280,20%,92%)] to-[hsl(340,30%,90%)]" />
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
      {/* Soft watercolor blobs */}
      <circle cx="60" cy="80" r="70" fill="hsl(200,50%,75%)" opacity="0.15" />
      <circle cx="340" cy="120" r="55" fill="hsl(330,40%,75%)" opacity="0.12" />
      <circle cx="100" cy="460" r="80" fill="hsl(160,35%,75%)" opacity="0.1" />
      <circle cx="320" cy="500" r="60" fill="hsl(270,30%,80%)" opacity="0.12" />
      <circle cx="200" cy="280" r="100" fill="hsl(45,40%,85%)" opacity="0.08" />
      {/* Splatter dots */}
      {[
        [50, 200], [150, 100], [300, 180], [350, 400], [80, 380], [250, 450], [180, 50], [320, 300],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill={`hsl(${200 + i * 20},40%,65%)`} opacity="0.2" />
      ))}
    </svg>
  </>
);

const StarfieldLayer = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(260,35%,8%)] via-[hsl(240,25%,14%)] to-[hsl(220,20%,18%)]" />
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 560">
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => {
        const x = (i * 137.5) % 400;
        const y = (i * 89.3) % 560;
        const r = 0.5 + (i % 4) * 0.5;
        return <circle key={i} cx={x} cy={y} r={r} fill="hsl(0,0%,100%)" opacity={0.3 + (i % 5) * 0.12} />;
      })}
      {/* Nebula glow */}
      <circle cx="300" cy="150" r="80" fill="hsl(280,50%,50%)" opacity="0.06" />
      <circle cx="100" cy="400" r="100" fill="hsl(200,50%,50%)" opacity="0.05" />
      {/* Constellation lines */}
      <polyline points="80,60 120,100 160,80 200,120" fill="none" stroke="hsl(0,0%,100%)" strokeWidth="0.3" opacity="0.2" />
      <polyline points="280,400 320,380 350,420 330,460" fill="none" stroke="hsl(0,0%,100%)" strokeWidth="0.3" opacity="0.2" />
    </svg>
  </>
);

const RibbonLayer = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(350,50%,50%)] via-[hsl(340,40%,45%)] to-[hsl(330,35%,38%)]" />
    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 560">
      {/* Crossing ribbons */}
      <path d="M-20,100 Q200,180 420,80" fill="none" stroke="hsl(0,0%,100%)" strokeWidth="12" opacity="0.15" />
      <path d="M-20,460 Q200,380 420,480" fill="none" stroke="hsl(0,0%,100%)" strokeWidth="12" opacity="0.15" />
      <path d="M-20,100 Q200,180 420,80" fill="none" stroke="hsl(0,0%,100%)" strokeWidth="1" />
      <path d="M-20,460 Q200,380 420,480" fill="none" stroke="hsl(0,0%,100%)" strokeWidth="1" />
      {/* Bow at center top */}
      <path d="M180,60 Q160,30 200,20 Q240,30 220,60" fill="none" stroke="hsl(0,0%,100%)" strokeWidth="1.5" />
      <circle cx="200" cy="65" r="5" fill="hsl(0,0%,100%)" opacity="0.3" />
    </svg>
  </>
);

const MosaicLayer = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(160,30%,32%)] via-[hsl(180,20%,28%)] to-[hsl(200,25%,25%)]" />
    <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 400 560">
      {/* Mosaic tiles */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => {
          const offset = row % 2 === 0 ? 0 : 33;
          const colors = ["hsl(45,70%,60%)", "hsl(160,40%,50%)", "hsl(200,35%,55%)", "hsl(350,40%,55%)"];
          return (
            <rect
              key={`${row}-${col}`}
              x={offset + col * 66}
              y={row * 70}
              width="60"
              height="64"
              rx="3"
              fill={colors[(row + col) % colors.length]}
              opacity={0.15 + ((row + col) % 3) * 0.05}
            />
          );
        })
      )}
      {/* Decorative border */}
      <rect x="10" y="10" width="380" height="540" rx="12" fill="none" stroke="hsl(45,60%,60%)" strokeWidth="2" strokeDasharray="8 4" />
    </svg>
  </>
);

const styleLayerMap: Record<CardTemplate["style"], React.FC> = {
  floral: FloralLayer,
  geometric: GeometricLayer,
  "gradient-burst": GradientBurstLayer,
  "art-deco": ArtDecoLayer,
  watercolor: WatercolorLayer,
  starfield: StarfieldLayer,
  ribbon: RibbonLayer,
  mosaic: MosaicLayer,
};

const AiLayer = ({ svg }: { svg?: string }) => {
  if (!svg) return null;
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      viewBox="0 0 400 560"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export const CelebrationCard = ({
  recipientName,
  senderName,
  message,
  celebration,
  emoji,
  template,
  className = "",
}: CelebrationCardProps) => {
  const isAi = !!template.aiBgGradient;
  const StyleLayer = isAi ? null : styleLayerMap[template.style];
  const textStyle = isAi ? { color: template.aiTextColor } : undefined;
  const accentStyle = isAi ? { backgroundColor: template.aiAccentColor } : undefined;

  return (
    <div
      className={`relative w-[400px] h-[560px] rounded-2xl overflow-hidden shadow-2xl ${className}`}
    >
      {/* Base bg */}
      {isAi ? (
        <div className="absolute inset-0" style={{ background: template.aiBgGradient }} />
      ) : (
        <div className={`absolute inset-0 ${template.bgClass}`} />
      )}
      {/* Visual layer */}
      {isAi ? <AiLayer svg={template.aiPatternSvg} /> : StyleLayer && <StyleLayer />}
      <Sparkles />

      {/* Border frame */}
      <div className="absolute inset-3 border border-[hsl(0,0%,100%)]/10 rounded-xl pointer-events-none" />
      <div className="absolute inset-5 border border-[hsl(0,0%,100%)]/5 rounded-lg pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-between h-full p-10 text-center">
        {/* Top decorative line */}
        <div className="flex items-center gap-3 w-full">
          {isAi ? (
            <div className="flex-1 h-px opacity-30" style={accentStyle} />
          ) : (
            <div className={`flex-1 h-px ${template.accentClass} opacity-30`} />
          )}
          <motion.span
            className={`text-lg opacity-50 ${!isAi ? template.textClass : ""}`}
            style={textStyle}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {template.decorations}
          </motion.span>
          {isAi ? (
            <div className="flex-1 h-px opacity-30" style={accentStyle} />
          ) : (
            <div className={`flex-1 h-px ${template.accentClass} opacity-30`} />
          )}
        </div>

        {/* Emoji */}
        <motion.div
          className="text-5xl my-2"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          {emoji}
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5 max-w-[320px]">
          <motion.h2
            className={`text-3xl font-display font-bold leading-tight ${!isAi ? template.textClass : ""}`}
            style={textStyle}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            Happy {celebration}!
          </motion.h2>

          <motion.p
            className={`text-base font-display font-semibold opacity-90 ${!isAi ? template.textClass : ""}`}
            style={textStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.4 }}
          >
            Dear {recipientName || "Friend"},
          </motion.p>

          <motion.p
            className={`text-sm opacity-75 leading-relaxed font-body ${!isAi ? template.textClass : ""}`}
            style={textStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {message || "Wishing you all the happiness in the world!"}
          </motion.p>
        </div>

        {/* Bottom sender */}
        <motion.div
          className={!isAi ? template.textClass : ""}
          style={textStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {isAi ? (
            <div className="w-12 h-px opacity-40 mx-auto mb-3" style={accentStyle} />
          ) : (
            <div className={`w-12 h-px ${template.accentClass} opacity-40 mx-auto mb-3`} />
          )}
          <p className="text-xs opacity-60 font-body">With love,</p>
          <p className="text-lg font-display font-bold mt-1">
            {senderName || "Your Friend"}
          </p>
        </motion.div>

        {/* Corner decorations */}
        {[
          "absolute top-7 left-7",
          "absolute top-7 right-7",
          "absolute bottom-7 left-7",
          "absolute bottom-7 right-7",
        ].map((pos) => (
          <div
            key={pos}
            className={`${pos} text-sm opacity-25 ${!isAi ? template.textClass : ""}`}
            style={textStyle}
          >
            {template.decorations}
          </div>
        ))}
      </div>
    </div>
  );
};
