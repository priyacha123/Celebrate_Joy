import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { videoTemplates, VideoTemplate } from "@/data/videoConfig";
import { toast } from "sonner";

interface MediaUploadProps {
  onMediaSelect: (file: File, template: VideoTemplate) => void;
  selectedTemplate: VideoTemplate | null;
  onTemplateChange: (template: VideoTemplate) => void;
  uploadedFile: File | null;
  onRemoveFile: () => void;
}

export const MediaUpload = ({
  onMediaSelect,
  selectedTemplate,
  onTemplateChange,
  uploadedFile,
  onRemoveFile,
}: MediaUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      toast.error("Please upload an image or video file");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File too large. Max 50MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onMediaSelect(file, selectedTemplate || videoTemplates[0]);
  };

  const handleRemove = () => {
    setPreview(null);
    onRemoveFile();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      {!uploadedFile ? (
        <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
        >
          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-body font-semibold text-sm text-foreground">
            Upload Photo or Video
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            JPG, PNG, MP4, MOV · Max 50MB
          </p>
        </motion.div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-border">
          {preview && uploadedFile.type.startsWith("image/") && (
            <img src={preview} alt="Upload preview" className="w-full h-40 object-cover" />
          )}
          {preview && uploadedFile.type.startsWith("video/") && (
            <video src={preview} className="w-full h-40 object-cover" muted autoPlay loop />
          )}
          <div className="absolute top-2 right-2 flex gap-1">
            <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-md font-body flex items-center gap-1">
              {uploadedFile.type.startsWith("image/") ? (
                <Image className="w-3 h-3" />
              ) : (
                <Film className="w-3 h-3" />
              )}
              {(uploadedFile.size / (1024 * 1024)).toFixed(1)}MB
            </span>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleRemove}
              className="h-6 w-6 p-0 rounded-md"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Video templates */}
      <div className="space-y-2">
        <p className="text-xs font-body font-semibold text-muted-foreground">
          Video Templates
        </p>
        <div className="grid grid-cols-3 gap-2">
          {videoTemplates.map((t) => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onTemplateChange(t)}
              className={`p-2 rounded-lg border-2 transition-all ${
                selectedTemplate?.id === t.id
                  ? "border-primary shadow-sm"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className={`h-8 rounded ${t.preview} mb-1.5`} />
              <p className="text-[10px] font-body font-semibold text-foreground leading-tight">
                {t.name}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
