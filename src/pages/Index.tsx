import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ConfettiBackground } from "@/components/ConfettiBackground";
import { celebrations } from "@/data/celebrations";
import { Sparkle, Heart, PartyPopper, Gift, ArrowRight, Star, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useRef } from "react";

const floatingEmojis = ["🎉", "🎊", "✨", "🎈", "💫", "🌟", "🎁", "💝"];

const Index = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.3]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ConfettiBackground />
      <Navbar />

      {/* Floating decorative emojis */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 container mx-auto px-6 pt-20 pb-32 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, type: "spring", bounce: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          {/* Animated badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-10"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Wand2 className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-body font-semibold text-primary tracking-wide">
              AI-Powered Celebration Cards
            </span>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Sparkle className="w-3 h-3 text-primary" />
            </motion.div>
          </motion.div>

          {/* Main heading with staggered animation */}
          <div className="mb-8">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Celebrate Every
            </motion.h1>
            <motion.div
              className="relative inline-block mt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary">
                Special Moment
              </h1>
              {/* Decorative underline */}
              <motion.svg
                viewBox="0 0 300 12"
                className="absolute -bottom-3 left-0 w-full"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.path
                  d="M5 8 Q75 2 150 8 Q225 14 295 6"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.svg>
            </motion.div>
          </div>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground font-body max-w-xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Create stunning AI-generated cards and animated videos for birthdays,
            holidays, and every celebration that matters.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={() => navigate("/create")}
                className="font-body font-bold text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <PartyPopper className="mr-2 w-5 h-5" />
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/storage")}
                className="font-body font-semibold text-lg px-10 py-7 rounded-2xl border-2"
              >
                View My Cards
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex items-center justify-center gap-8 mt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {[
              { value: "7+", label: "Celebrations" },
              { value: "8+", label: "Card Templates" },
              { value: "AI", label: "Powered" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs font-body text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <span className="text-sm font-body font-semibold text-primary tracking-widest uppercase">
            What You Can Do
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            Everything You Need
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: <Heart className="w-7 h-7" />,
              title: "AI Card Templates",
              desc: "Describe your dream design and our AI creates a unique, beautiful card template just for you.",
              emoji: "🎨",
            },
            {
              icon: <PartyPopper className="w-7 h-7" />,
              title: "Animated Videos",
              desc: "AI-generated character animations with voice narration, captions, and playback controls.",
              emoji: "🎬",
            },
            {
              icon: <Gift className="w-7 h-7" />,
              title: "Download & Share",
              desc: "Download your creations as images or save them to your personal storage for sharing anytime.",
              emoji: "📤",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, type: "spring" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative corner emoji */}
              <span className="absolute top-4 right-4 text-3xl opacity-10 group-hover:opacity-25 transition-opacity">
                {feature.emoji}
              </span>

              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/15 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 container mx-auto px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <span className="text-sm font-body font-semibold text-primary tracking-widest uppercase">
            Simple & Fun
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            How It Works
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-0">
          {[
            { step: "1", title: "Pick a Celebration", desc: "Choose from birthdays, holidays, and special occasions.", icon: "🎯" },
            { step: "2", title: "Customize Your Card", desc: "Add your message, choose a template, or let AI design one for you.", icon: "✍️" },
            { step: "3", title: "Download & Share", desc: "Save your creation and share the joy with loved ones.", icon: "🎁" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, type: "spring" }}
              className="flex items-start gap-6 py-8 relative"
            >
              {/* Connector line */}
              {i < 2 && (
                <div className="absolute left-7 top-[4.5rem] w-0.5 h-8 bg-border" />
              )}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <div>
                <span className="text-xs font-body font-bold text-primary tracking-widest uppercase">
                  Step {item.step}
                </span>
                <h3 className="font-display font-bold text-lg text-foreground mt-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Celebrations Grid */}
      <section className="relative z-10 container mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <span className="text-sm font-body font-semibold text-primary tracking-widest uppercase">
            Get Started
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            Choose Your Celebration
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-md mx-auto">
            Pick an occasion and create something beautiful in minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {celebrations.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.06, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/create?celebration=${c.id}`)}
              className={`group relative p-6 rounded-3xl ${c.bgColor} text-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.15)_50%,transparent_70%)]" />
              
              <motion.div
                className="text-5xl mb-3"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {c.emoji}
              </motion.div>
              <h3 className="font-display font-bold text-sm">{c.name}</h3>
              <p className="text-xs mt-1 opacity-70 font-body">{c.description}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 container mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-primary/10 border border-primary/20 rounded-3xl p-10 md:p-14 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block mb-4"
          >
            <Star className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
            Start designing your perfect celebration card with AI-powered templates right now.
          </p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              onClick={() => navigate("/create")}
              className="font-body font-bold text-lg px-12 py-7 rounded-2xl shadow-lg"
            >
              Create Your Card
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-card">
        <div className="container mx-auto px-6 pt-16 pb-8">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <PartyPopper className="w-6 h-6 text-primary" />
                <span className="font-display text-xl font-bold text-primary">
                  CelebrateJoy
                </span>
              </div>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                Create beautiful AI-powered celebration cards and animated videos for every special occasion.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-sm text-foreground mb-4 uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/create", label: "Create Card" },
                  { to: "/storage", label: "My Storage" },
                  { to: "/contact", label: "Contact Us" },
                ].map((link) => (
                  <li key={link.to}>
                    <button
                      onClick={() => navigate(link.to)}
                      className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Celebrations */}
            <div>
              <h4 className="font-display font-bold text-sm text-foreground mb-4 uppercase tracking-wider">
                Celebrations
              </h4>
              <ul className="space-y-3">
                {celebrations.slice(0, 5).map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => navigate(`/create?celebration=${c.id}`)}
                      className="text-sm font-body text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <span>{c.emoji}</span>
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-display font-bold text-sm text-foreground mb-4 uppercase tracking-wider">
                Features
              </h4>
              <ul className="space-y-3">
                {[
                  "AI Card Templates",
                  "Animated Videos",
                  "Voice Narration",
                  "Multiple Languages",
                  "Download & Share",
                ].map((feature) => (
                  <li key={feature}>
                    <span className="text-sm font-body text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs font-body text-muted-foreground">
                © {new Date().getFullYear()} CelebrateJoy. All rights reserved.
              </p>
              <p className="text-xs font-body text-muted-foreground">
                Made with ❤️ for every special celebration
              </p>
              <div className="flex items-center gap-6">
                <span className="text-xs font-body text-muted-foreground hover:text-primary cursor-pointer transition-colors">Privacy</span>
                <span className="text-xs font-body text-muted-foreground hover:text-primary cursor-pointer transition-colors">Terms</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
