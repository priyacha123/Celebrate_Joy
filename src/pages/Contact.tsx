import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon 💌");
    setName("");
    setEmail("");
    setMsg("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Have a question, suggestion, or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="md:col-span-2 space-y-8">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@celebratejoy.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+1 (555) 123-4567",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "San Francisco, CA",
                },
              ].map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-foreground">
                      {info.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="md:col-span-3 space-y-5 bg-card border border-border rounded-2xl p-8"
            >
              <div className="space-y-2">
                <Label className="font-body font-semibold text-foreground">Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="rounded-xl bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-body font-semibold text-foreground">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-xl bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-body font-semibold text-foreground">Message</Label>
                <Textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Tell us what you think..."
                  className="rounded-xl bg-background min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-xl font-body font-semibold gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
