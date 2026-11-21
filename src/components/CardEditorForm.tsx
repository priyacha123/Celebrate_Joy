import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cardTemplates, CardTemplate } from "@/data/celebrations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CardEditorFormProps {
  recipientName: string;
  senderName: string;
  message: string;
  customPrompt: string;
  selectedTemplate: CardTemplate;
  onRecipientChange: (v: string) => void;
  onSenderChange: (v: string) => void;
  onMessageChange: (v: string) => void;
  onCustomPromptChange: (v: string) => void;
  onTemplateChange: (t: CardTemplate) => void;
}

export const CardEditorForm = ({
  recipientName,
  senderName,
  message,
  customPrompt,
  selectedTemplate,
  onRecipientChange,
  onSenderChange,
  onMessageChange,
  onCustomPromptChange,
  onTemplateChange,
}: CardEditorFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTemplate = async () => {
    if (!customPrompt.trim()) {
      toast.error("Please enter a prompt to generate a template");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-card-template",
        { body: { prompt: customPrompt.trim() } }
      );

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const aiTemplate: CardTemplate = {
        id: `ai-${Date.now()}`,
        name: data.name || "AI Generated",
        bgClass: "",
        textClass: "",
        accentClass: "",
        decorations: data.decoration || "✦",
        preview: "",
        style: "floral",
        // AI-generated inline styles
        aiBgGradient: data.bgGradient,
        aiTextColor: data.textColor,
        aiAccentColor: data.accentColor,
        aiPatternSvg: data.patternSvg,
      };

      onTemplateChange(aiTemplate);
      toast.success(`"${aiTemplate.name}" template generated!`);
    } catch (e: any) {
      console.error("AI template generation failed:", e);
      toast.error(e.message || "Failed to generate template. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label className="font-body font-semibold text-foreground">
          Recipient Name
        </Label>
        <Input
          placeholder="Who is this for?"
          value={recipientName}
          onChange={(e) => onRecipientChange(e.target.value)}
          className="rounded-xl border-border bg-card"
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label className="font-body font-semibold text-foreground">
          Your Name
        </Label>
        <Input
          placeholder="From..."
          value={senderName}
          onChange={(e) => onSenderChange(e.target.value)}
          className="rounded-xl border-border bg-card"
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label className="font-body font-semibold text-foreground">
          Your Message
        </Label>
        <Textarea
          placeholder="Write a heartfelt message..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className="rounded-xl border-border bg-card min-h-[100px]"
          maxLength={500}
        />
      </div>

      {/* AI Template Prompt */}
      <div className="space-y-2">
        <Label className="font-body font-semibold text-foreground flex items-center gap-2">
          <Sparkle className="w-4 h-4 text-primary" />
          AI Template Prompt
        </Label>
        <Textarea
          placeholder='Describe your dream card style... e.g. "ocean sunset with golden sparkles" or "dark elegant with red roses"'
          value={customPrompt}
          onChange={(e) => onCustomPromptChange(e.target.value)}
          className="rounded-xl border-border bg-card min-h-[80px]"
          maxLength={300}
        />
        <Button
          onClick={handleGenerateTemplate}
          disabled={isGenerating || !customPrompt.trim()}
          className="w-full rounded-xl font-body font-semibold gap-2"
          size="sm"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating Design...
            </>
          ) : (
            <>
              <Sparkle className="w-4 h-4" />
              Generate AI Template
            </>
          )}
        </Button>
      </div>

      {/* Preset Templates */}
      <div className="space-y-2">
        <Label className="font-body font-semibold text-foreground">
          Or Choose a Preset
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {cardTemplates.map((t) => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onTemplateChange(t)}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedTemplate.id === t.id
                  ? "border-primary shadow-md"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div
                className={`h-10 rounded-lg ${t.preview} mb-2 border border-[hsl(0,0%,50%)]/10`}
              />
              <p className="text-xs font-body font-semibold text-foreground">
                {t.decorations} {t.name}
              </p>
            </motion.button>
          ))}

          {/* Show AI-generated template if active */}
          {selectedTemplate.id.startsWith("ai-") && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 rounded-xl border-2 border-primary shadow-md col-span-2"
            >
              <div
                className="h-10 rounded-lg mb-2 border border-[hsl(0,0%,50%)]/10"
                style={{ background: selectedTemplate.aiBgGradient }}
              />
              <p className="text-xs font-body font-semibold text-foreground flex items-center gap-1 justify-center">
                <Sparkle className="w-3 h-3 text-primary" />
                {selectedTemplate.decorations} {selectedTemplate.name}
                <span className="text-muted-foreground">(AI)</span>
              </p>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
