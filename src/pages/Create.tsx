import { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { Download, Image, Video, Eye, Loader2, Play, Pause, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { CelebrationPicker } from "@/components/CelebrationPicker";
import { CardEditorForm } from "@/components/CardEditorForm";
import { CelebrationCard } from "@/components/CelebrationCard";
import { MotionVideoPlayer, VideoDuration } from "@/components/MotionVideoPlayer";
import { VideoDurationPicker } from "@/components/VideoDurationPicker";
import { VideoControls } from "@/components/VideoControls";
import { MediaUpload } from "@/components/MediaUpload";
import { ConfettiBackground } from "@/components/ConfettiBackground";
import { useVideoRecorder } from "@/hooks/useVideoRecorder";
import {
  celebrations,
  Celebration,
  cardTemplates,
  CardTemplate,
} from "@/data/celebrations";
import {
  CaptionLanguageCode,
  PlaybackSpeed,
  VideoTemplate,
  videoTemplates,
} from "@/data/videoConfig";
import { toast } from "sonner";

const Create = () => {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("celebration");

  const [selectedCelebration, setSelectedCelebration] =
    useState<Celebration | null>(
      preselected
        ? celebrations.find((c) => c.id === preselected) || null
        : null
    );
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>(
    cardTemplates[0]
  );
  const [outputType, setOutputType] = useState<"card" | "video">("card");
  const [videoDuration, setVideoDuration] = useState<VideoDuration>(30);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [captionLang, setCaptionLang] = useState<CaptionLanguageCode>("en");
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | null>(null);
  const [uploadedMediaType, setUploadedMediaType] = useState<"image" | "video" | null>(null);
  const [selectedVideoTemplate, setSelectedVideoTemplate] = useState<VideoTemplate>(videoTemplates[0]);
  const [step, setStep] = useState<"pick" | "edit" | "preview">(
    preselected ? "edit" : "pick"
  );

  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const { isRecording, recordingProgress, startRecording } = useVideoRecorder();

  useEffect(() => {
    if (preselected) {
      const found = celebrations.find((c) => c.id === preselected);
      if (found) {
        setSelectedCelebration(found);
        setStep("edit");
      }
    }
  }, [preselected]);

  const handleCelebrationSelect = (c: Celebration) => {
    setSelectedCelebration(c);
    setStep("edit");
  };

  const handleMediaSelect = (file: File, template: VideoTemplate) => {
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setUploadedMediaUrl(url);
    setUploadedMediaType(file.type.startsWith("image/") ? "image" : "video");
    setSelectedVideoTemplate(template);
  };

  const handleRemoveFile = () => {
    if (uploadedMediaUrl) URL.revokeObjectURL(uploadedMediaUrl);
    setUploadedFile(null);
    setUploadedMediaUrl(null);
    setUploadedMediaType(null);
  };

  const saveToStorage = useCallback((name: string, dataUrl: string, type: "card" | "video") => {
    try {
      const stored = localStorage.getItem("celebratejoy-storage");
      const items = stored ? JSON.parse(stored) : [];
      items.unshift({
        id: crypto.randomUUID(),
        name,
        type,
        dataUrl,
        createdAt: new Date().toISOString(),
        celebration: selectedCelebration?.name || "Custom",
      });
      localStorage.setItem("celebratejoy-storage", JSON.stringify(items));
    } catch {
      // Storage full or other error - silently fail
    }
  }, [selectedCelebration]);

  const handleDownload = useCallback(async () => {
    if (outputType === "card") {
      if (!cardRef.current) return;
      try {
        const dataUrl = await toPng(cardRef.current, {
          cacheBust: true,
          pixelRatio: 2,
        });
        const fileName = `celebration-card-${selectedCelebration?.id || "custom"}.png`;
        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
        saveToStorage(fileName, dataUrl, "card");
        toast.success("Card downloaded and saved to storage!");
      } catch {
        toast.error("Download failed. Please try again.");
      }
    } else {
      if (!videoRef.current) return;
      toast.info("Recording video... Please wait for the animation to complete.");
      setIsVideoPlaying(true);
      setTimeout(async () => {
        if (videoRef.current) {
          const fileName = `celebration-video-${selectedCelebration?.id || "custom"}.webm`;
          await startRecording(
            videoRef.current,
            videoDuration * 1000,
            fileName
          );
          // Note: video dataUrl storage is limited by localStorage size
        }
      }, 100);
    }
  }, [outputType, selectedCelebration, videoDuration, startRecording, saveToStorage]);

  const videoPlayerProps = {
    recipientName,
    senderName,
    message,
    celebration: selectedCelebration?.name || "",
    celebrationId: selectedCelebration?.id || "",
    template: selectedTemplate,
    duration: videoDuration,
    isPlaying: isVideoPlaying,
    captionsOn,
    captionLang,
    speed: playbackSpeed,
    uploadedMediaUrl,
    uploadedMediaType,
    videoTemplate: selectedVideoTemplate,
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ConfettiBackground />
      <Navbar />

      <div className="relative z-10 container mx-auto px-6 py-10">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {["pick", "edit", "preview"].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  if (s === "pick") setStep("pick");
                  if (s === "edit" && selectedCelebration) setStep("edit");
                  if (s === "preview" && selectedCelebration) setStep("preview");
                }}
                className={`w-10 h-10 rounded-full font-display font-bold text-sm flex items-center justify-center transition-all ${
                  step === s
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </motion.button>
              {i < 2 && (
                <div className="w-12 h-0.5 bg-border rounded-full" />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Pick celebration */}
          {step === "pick" && (
            <motion.div
              key="pick"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold text-center mb-2">
                What are we <span className="text-primary">celebrating</span>?
              </h1>
              <p className="text-center text-muted-foreground mb-8 font-body">
                Pick an occasion to get started
              </p>
              <CelebrationPicker
                selected={selectedCelebration}
                onSelect={handleCelebrationSelect}
              />
            </motion.div>
          )}

          {/* Step 2: Edit */}
          {step === "edit" && selectedCelebration && (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              <h1 className="text-3xl font-display font-bold text-center mb-8">
                {selectedCelebration.emoji} Customize Your{" "}
                <span className="text-primary">
                  {selectedCelebration.name}
                </span>{" "}
                Wish
              </h1>

              {/* Output type toggle */}
              <div className="flex justify-center mb-8">
                <Tabs
                  value={outputType}
                  onValueChange={(v) => setOutputType(v as "card" | "video")}
                >
                  <TabsList className="bg-muted rounded-xl p-1">
                    <TabsTrigger
                      value="card"
                      className="rounded-lg font-body font-semibold data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2"
                    >
                      <Image className="w-4 h-4" /> Card
                    </TabsTrigger>
                    <TabsTrigger
                      value="video"
                      className="rounded-lg font-body font-semibold data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2"
                    >
                      <Video className="w-4 h-4" /> Animated Video
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 items-start">
                {/* Left column: Form + extras */}
                <div className="space-y-6">
                  <CardEditorForm
                    recipientName={recipientName}
                    senderName={senderName}
                    message={message}
                    customPrompt={customPrompt}
                    selectedTemplate={selectedTemplate}
                    onRecipientChange={setRecipientName}
                    onSenderChange={setSenderName}
                    onMessageChange={setMessage}
                    onCustomPromptChange={setCustomPrompt}
                    onTemplateChange={setSelectedTemplate}
                  />

                  {/* Media upload section - video only */}
                  {outputType === "video" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card border border-border rounded-2xl p-5"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Upload className="w-4 h-4 text-primary" />
                        <p className="font-body font-semibold text-sm text-foreground">
                          Upload Media & Templates
                        </p>
                      </div>
                      <MediaUpload
                        onMediaSelect={handleMediaSelect}
                        selectedTemplate={selectedVideoTemplate}
                        onTemplateChange={setSelectedVideoTemplate}
                        uploadedFile={uploadedFile}
                        onRemoveFile={handleRemoveFile}
                      />
                    </motion.div>
                  )}
                </div>

                {/* Right column: Preview */}
                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm font-body font-semibold text-muted-foreground">
                    Live Preview
                  </p>
                  <div className="transform scale-[0.85] origin-top">
                    {outputType === "card" ? (
                      <div ref={cardRef}>
                        <CelebrationCard
                          recipientName={recipientName}
                          senderName={senderName}
                          message={message}
                          celebration={selectedCelebration.name}
                          emoji={selectedCelebration.emoji}
                          template={selectedTemplate}
                        />
                      </div>
                    ) : (
                      <div ref={videoRef}>
                        <MotionVideoPlayer {...videoPlayerProps} />
                      </div>
                    )}
                  </div>

                  {/* Video controls */}
                  {outputType === "video" && (
                    <div className="flex flex-col items-center gap-3 w-full max-w-md">
                      <VideoDurationPicker
                        selected={videoDuration}
                        onChange={setVideoDuration}
                      />

                      <VideoControls
                        captionsOn={captionsOn}
                        onCaptionsToggle={() => setCaptionsOn(!captionsOn)}
                        captionLang={captionLang}
                        onLangChange={setCaptionLang}
                        speed={playbackSpeed}
                        onSpeedChange={setPlaybackSpeed}
                      />

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      >
                        {isVideoPlaying ? (
                          <><Pause className="w-4 h-4 mr-1" /> Pause</>
                        ) : (
                          <><Play className="w-4 h-4 mr-1" /> Play</>
                        )}
                      </Button>
                    </div>
                  )}

                  <div className="flex gap-3 mt-2">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        onClick={() => setStep("preview")}
                        variant="outline"
                        className="rounded-xl font-body font-semibold gap-2"
                      >
                        <Eye className="w-4 h-4" /> Full Preview
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        onClick={handleDownload}
                        disabled={isRecording}
                        className="rounded-xl font-body font-semibold gap-2"
                      >
                        {isRecording ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Recording {Math.round(recordingProgress)}%
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            {outputType === "video" ? "Record & Download" : "Download"}
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview */}
          {step === "preview" && selectedCelebration && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-8"
            >
              <h1 className="text-3xl font-display font-bold">
                {selectedCelebration.emoji} Your{" "}
                <span className="text-primary">Creation</span> is Ready!
              </h1>

              {outputType === "card" ? (
                <div ref={cardRef}>
                  <CelebrationCard
                    recipientName={recipientName}
                    senderName={senderName}
                    message={message}
                    celebration={selectedCelebration.name}
                    emoji={selectedCelebration.emoji}
                    template={selectedTemplate}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div ref={videoRef}>
                    <MotionVideoPlayer {...videoPlayerProps} />
                  </div>
                  <VideoControls
                    captionsOn={captionsOn}
                    onCaptionsToggle={() => setCaptionsOn(!captionsOn)}
                    captionLang={captionLang}
                    onLangChange={setCaptionLang}
                    speed={playbackSpeed}
                    onSpeedChange={setPlaybackSpeed}
                  />
                </div>
              )}

              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    onClick={() => setStep("edit")}
                    className="rounded-xl font-body font-semibold"
                  >
                    ✏️ Edit More
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={handleDownload}
                    disabled={isRecording}
                    className="rounded-xl font-body font-semibold gap-2 px-8"
                  >
                    {isRecording ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Recording {Math.round(recordingProgress)}%
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        {outputType === "video" ? "Record & Download" : "Download"}
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Create;
