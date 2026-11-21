// Supported caption languages
export const CAPTION_LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ta", name: "Tamil", flag: "🇮🇳" },
  { code: "te", name: "Telugu", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", flag: "🇮🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
] as const;

export type CaptionLanguageCode = (typeof CAPTION_LANGUAGES)[number]["code"];

export const PLAYBACK_SPEEDS = [
  { value: 0.5, label: "0.5x" },
  { value: 1, label: "1x" },
  { value: 1.25, label: "1.25x" },
  { value: 1.5, label: "1.5x" },
  { value: 1.75, label: "1.75x" },
  { value: 2, label: "2x" },
] as const;

export type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number]["value"];

// Caption text for each phase, keyed by language
export const getCaptionText = (
  phase: string,
  celebration: string,
  recipientName: string,
  senderName: string,
  message: string,
  lang: CaptionLanguageCode
): string => {
  const name = recipientName || "Friend";
  const sender = senderName || "Your Friend";
  const msg = message || "Wishing you all the happiness in the world!";

  // English captions (default)
  const englishCaptions: Record<string, string> = {
    intro: `✨ A special celebration awaits...`,
    greeting: `Happy ${celebration}! Dear ${name}`,
    message: msg,
    celebration: `🎉 Happy ${celebration}! 🎉`,
    sender: `With love, ${sender}`,
    outro: `${celebration} — Made with love`,
  };

  const hindiCaptions: Record<string, string> = {
    intro: `✨ एक विशेष उत्सव आपका इंतज़ार कर रहा है...`,
    greeting: `${celebration} की शुभकामनाएं! प्रिय ${name}`,
    message: msg,
    celebration: `🎉 ${celebration} मुबारक! 🎉`,
    sender: `प्यार से, ${sender}`,
    outro: `${celebration} — प्यार से बनाया गया`,
  };

  const spanishCaptions: Record<string, string> = {
    intro: `✨ Una celebración especial te espera...`,
    greeting: `¡Feliz ${celebration}! Querido/a ${name}`,
    message: msg,
    celebration: `🎉 ¡Feliz ${celebration}! 🎉`,
    sender: `Con amor, ${sender}`,
    outro: `${celebration} — Hecho con amor`,
  };

  const frenchCaptions: Record<string, string> = {
    intro: `✨ Une célébration spéciale vous attend...`,
    greeting: `Joyeux ${celebration}! Cher(e) ${name}`,
    message: msg,
    celebration: `🎉 Joyeux ${celebration}! 🎉`,
    sender: `Avec amour, ${sender}`,
    outro: `${celebration} — Fait avec amour`,
  };

  const captions: Record<string, Record<string, string>> = {
    en: englishCaptions,
    hi: hindiCaptions,
    es: spanishCaptions,
    fr: frenchCaptions,
  };

  // Fallback to English for unsupported languages
  const langCaptions = captions[lang] || captions.en;
  return langCaptions[phase] || englishCaptions[phase] || "";
};

// Video templates for uploaded media
export interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  overlayClass: string;
  textPosition: "center" | "bottom" | "top";
  textStyle: string;
  preview: string;
}

export const videoTemplates: VideoTemplate[] = [
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Dark overlay with elegant centered text",
    overlayClass: "bg-black/50",
    textPosition: "center",
    textStyle: "text-white font-display italic text-3xl",
    preview: "bg-[hsl(220,15%,18%)]",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean look with subtle bottom text",
    overlayClass: "bg-black/20",
    textPosition: "bottom",
    textStyle: "text-white font-body text-lg",
    preview: "bg-[hsl(220,10%,30%)]",
  },
  {
    id: "warm-glow",
    name: "Warm Glow",
    description: "Warm toned overlay with top text",
    overlayClass: "bg-[hsl(25,60%,20%)]/50",
    textPosition: "top",
    textStyle: "text-[hsl(40,40%,90%)] font-display text-2xl",
    preview: "bg-[hsl(25,40%,30%)]",
  },
  {
    id: "vintage",
    name: "Vintage",
    description: "Sepia-toned retro look",
    overlayClass: "bg-[hsl(35,30%,25%)]/40",
    textPosition: "center",
    textStyle: "text-[hsl(40,50%,88%)] font-display italic text-2xl tracking-wider",
    preview: "bg-[hsl(35,25%,35%)]",
  },
  {
    id: "bold",
    name: "Bold Impact",
    description: "High contrast with large bold text",
    overlayClass: "bg-black/60",
    textPosition: "center",
    textStyle: "text-white font-display font-bold text-4xl uppercase tracking-widest",
    preview: "bg-[hsl(0,0%,15%)]",
  },
  {
    id: "pastel",
    name: "Soft Pastel",
    description: "Light pastel overlay for a dreamy feel",
    overlayClass: "bg-white/30",
    textPosition: "bottom",
    textStyle: "text-[hsl(220,15%,20%)] font-display text-xl",
    preview: "bg-[hsl(340,25%,85%)]",
  },
];
