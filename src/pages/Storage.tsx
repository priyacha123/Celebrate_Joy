import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Download, Trash2, Image, Video, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface StoredItem {
  id: string;
  name: string;
  type: "card" | "video";
  dataUrl: string;
  createdAt: string;
  celebration: string;
}

const Storage = () => {
  const [items, setItems] = useState<StoredItem[]>([]);
  const [filter, setFilter] = useState<"all" | "card" | "video">("all");

  useEffect(() => {
    const stored = localStorage.getItem("celebratejoy-storage");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  const filtered = items.filter((i) => filter === "all" || i.type === filter);

  const handleDelete = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem("celebratejoy-storage", JSON.stringify(updated));
    toast.success("Item removed from storage");
  };

  const handleDownload = (item: StoredItem) => {
    const link = document.createElement("a");
    link.href = item.dataUrl;
    link.download = item.name;
    link.click();
    toast.success("Downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
              Your <span className="text-primary">Storage</span>
            </h1>
            <p className="text-muted-foreground font-body">
              All your downloaded cards and videos are saved here
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex justify-center gap-3 mb-8">
            {[
              { value: "all" as const, label: "All", icon: FolderOpen },
              { value: "card" as const, label: "Cards", icon: Image },
              { value: "video" as const, label: "Videos", icon: Video },
            ].map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? "default" : "outline"}
                onClick={() => setFilter(f.value)}
                className="gap-2 rounded-xl font-body"
              >
                <f.icon className="w-4 h-4" />
                {f.label}
              </Button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FolderOpen className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-muted-foreground mb-2">
                No items yet
              </h3>
              <p className="text-muted-foreground font-body text-sm">
                Your downloaded cards and videos will appear here.
                <br />
                Head to <a href="/create" className="text-primary underline">Create</a> to make your first wish!
              </p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                      {item.dataUrl && item.type === "card" ? (
                        <img src={item.dataUrl} alt={item.name} className="w-full h-full object-cover" />
                      ) : item.type === "card" ? (
                        <Image className="w-10 h-10 text-muted-foreground/40" />
                      ) : (
                        <Video className="w-10 h-10 text-muted-foreground/40" />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-body font-semibold text-sm text-foreground truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.celebration} · {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(item)}
                          className="flex-1 gap-1 rounded-lg text-xs"
                        >
                          <Download className="w-3 h-3" /> Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item.id)}
                          className="gap-1 rounded-lg text-xs text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Storage;
