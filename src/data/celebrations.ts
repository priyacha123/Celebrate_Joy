export interface Celebration {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  description: string;
}

export const celebrations: Celebration[] = [
  {
    id: "womens-day",
    name: "Women's Day",
    emoji: "👩‍🦰",
    color: "primary",
    bgColor: "bg-[hsl(350,30%,55%)]",
    description: "Celebrate the strength and beauty of women",
  },
  {
    id: "mens-day",
    name: "Men's Day",
    emoji: "👨",
    color: "primary",
    bgColor: "bg-[hsl(210,20%,40%)]",
    description: "Honor the men who inspire us",
  },
  {
    id: "birthday",
    name: "Birthday",
    emoji: "🎂",
    color: "primary",
    bgColor: "bg-[hsl(25,50%,45%)]",
    description: "Make their birthday extra special",
  },
  {
    id: "mothers-day",
    name: "Mother's Day",
    emoji: "💐",
    color: "primary",
    bgColor: "bg-[hsl(340,25%,50%)]",
    description: "Show mom how much you care",
  },
  {
    id: "fathers-day",
    name: "Father's Day",
    emoji: "👔",
    color: "primary",
    bgColor: "bg-[hsl(200,15%,35%)]",
    description: "Thank dad for everything",
  },
  {
    id: "independence-day",
    name: "Independence Day",
    emoji: "🇮🇳",
    color: "primary",
    bgColor: "bg-[hsl(25,60%,45%)]",
    description: "Celebrate freedom and patriotism",
  },
  {
    id: "republic-day",
    name: "Republic Day",
    emoji: "🏛️",
    color: "primary",
    bgColor: "bg-[hsl(160,15%,40%)]",
    description: "Honor our great republic",
  },
];

export interface CardTemplate {
  id: string;
  name: string;
  bgClass: string;
  textClass: string;
  accentClass: string;
  decorations: string;
  preview: string;
  /** Visual style variant for the card renderer */
  style: "floral" | "geometric" | "gradient-burst" | "art-deco" | "watercolor" | "starfield" | "ribbon" | "mosaic";
  /** AI-generated fields (only present on AI templates) */
  aiBgGradient?: string;
  aiTextColor?: string;
  aiAccentColor?: string;
  aiPatternSvg?: string;
}

export const cardTemplates: CardTemplate[] = [
  {
    id: "floral-garden",
    name: "Floral Garden",
    bgClass: "card-template-dark",
    textClass: "text-[hsl(40,20%,92%)]",
    accentClass: "bg-[hsl(340,50%,70%)]",
    decorations: "🌸",
    preview: "bg-gradient-to-br from-[hsl(340,30%,25%)] to-[hsl(280,20%,18%)]",
    style: "floral",
  },
  {
    id: "geometric-gold",
    name: "Geometric Gold",
    bgClass: "card-template-charcoal",
    textClass: "text-[hsl(45,60%,85%)]",
    accentClass: "bg-[hsl(45,70%,55%)]",
    decorations: "◈",
    preview: "bg-gradient-to-br from-[hsl(210,10%,15%)] to-[hsl(45,30%,20%)]",
    style: "geometric",
  },
  {
    id: "sunset-burst",
    name: "Sunset Burst",
    bgClass: "card-template-warm",
    textClass: "text-[hsl(0,0%,100%)]",
    accentClass: "bg-[hsl(35,90%,65%)]",
    decorations: "✦",
    preview: "bg-gradient-to-br from-[hsl(350,60%,50%)] to-[hsl(35,80%,50%)]",
    style: "gradient-burst",
  },
  {
    id: "art-deco",
    name: "Art Deco",
    bgClass: "card-template-dark",
    textClass: "text-[hsl(45,50%,80%)]",
    accentClass: "bg-[hsl(45,60%,55%)]",
    decorations: "❖",
    preview: "bg-gradient-to-b from-[hsl(220,20%,12%)] to-[hsl(220,15%,22%)]",
    style: "art-deco",
  },
  {
    id: "watercolor-dream",
    name: "Watercolor Dream",
    bgClass: "card-template-cream",
    textClass: "text-[hsl(220,20%,25%)]",
    accentClass: "bg-[hsl(200,40%,55%)]",
    decorations: "❀",
    preview: "bg-gradient-to-br from-[hsl(200,30%,85%)] to-[hsl(330,25%,88%)]",
    style: "watercolor",
  },
  {
    id: "starfield",
    name: "Cosmic Night",
    bgClass: "card-template-dark",
    textClass: "text-[hsl(220,30%,92%)]",
    accentClass: "bg-[hsl(260,50%,70%)]",
    decorations: "✧",
    preview: "bg-gradient-to-b from-[hsl(260,30%,12%)] to-[hsl(220,25%,18%)]",
    style: "starfield",
  },
  {
    id: "ribbon-elegance",
    name: "Ribbon Elegance",
    bgClass: "card-template-rose",
    textClass: "text-[hsl(0,0%,100%)]",
    accentClass: "bg-[hsl(350,40%,80%)]",
    decorations: "🎀",
    preview: "bg-gradient-to-br from-[hsl(350,45%,50%)] to-[hsl(330,30%,40%)]",
    style: "ribbon",
  },
  {
    id: "mosaic-festive",
    name: "Festive Mosaic",
    bgClass: "card-template-sage",
    textClass: "text-[hsl(0,0%,100%)]",
    accentClass: "bg-[hsl(45,70%,60%)]",
    decorations: "✿",
    preview: "bg-gradient-to-br from-[hsl(160,25%,35%)] to-[hsl(200,20%,30%)]",
    style: "mosaic",
  },
];
