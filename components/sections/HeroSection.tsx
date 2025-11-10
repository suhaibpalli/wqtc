"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, BookOpen, Sparkles } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    badge: "Welcome to WQTC",
    title: "Learn the Qur'an translation",
    highlight: "Word for Word",
    description: "Understanding Quran becomes natural with our innovative teaching methodology",
    verse: "كِتٰبٌ اَنْزَلْنٰهُ اِلَيْكَ مُبٰرَكٌ",
    verseTranslation: "A Book full of blessings - Surah Saad [38:29]",
    primaryCTA: "Watch Classes",
    secondaryCTA: "Learn More",
    gradient: "from-slate-900 via-emerald-900 to-teal-900",
  },
  {
    id: 2,
    badge: "Free Online Classes",
    title: "Master Quran Translation",
    highlight: "Step by Step",
    description: "Join thousands of students learning Quran translation in English, Urdu, and Tamil",
    verse: "لِّيَدَّبَّرُوْٓا اٰيٰتِهٖ وَلِيَتَذَكَّرَ",
    verseTranslation: "That they may ponder over its Verses - Surah Saad [38:29]",
    primaryCTA: "Join for Free",
    secondaryCTA: "View Library",
    gradient: "from-indigo-900 via-purple-900 to-pink-900",
  },
  {
    id: 3,
    badge: "By Ustaad Imran Sait",
    title: "Transform Your Life",
    highlight: "Through Quran",
    description: "Experience life-changing impact through understanding Allah's message",
    verse: "اُولُوا الْاَلْبَابِ",
    verseTranslation: "Men of Understanding - Surah Saad [38:29]",
    primaryCTA: "Start Learning",
    secondaryCTA: "Contact Us",
    gradient: "from-blue-900 via-teal-900 to-cyan-900",
  },
];

const floatingDots = [
  { top: "10%", left: "15%", delay: "0s", size: "w-2 h-2" },
  { top: "25%", left: "85%", delay: "0.5s", size: "w-3 h-3" },
  { top: "45%", left: "20%", delay: "1s", size: "w-2 h-2" },
  { top: "60%", left: "75%", delay: "1.5s", size: "w-4 h-4" },
  { top: "75%", left: "30%", delay: "0.3s", size: "w-2 h-2" },
  { top: "35%", left: "90%", delay: "1.2s", size: "w-3 h-3" },
  { top: "85%", left: "50%", delay: "0.8s", size: "w-2 h-2" },
  { top: "20%", left: "60%", delay: "1.8s", size: "w-3 h-3" },
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className="embla__slide flex-[0_0_100%] min-w-0">
              <div className={`relative overflow-hidden bg-gradient-to-br ${slide.gradient} text-white min-h-[calc(100vh-4rem)]`}>
                {/* Animated geometric patterns */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                      linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)
                    `,
                    backgroundSize: '60px 60px',
                    backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
                  }} />
                </div>

                {/* Gradient orbs with glassmorphism */}
                <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float" />
                <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '8s' }} />

                <div className="container relative mx-auto px-4 py-20 md:py-32 lg:py-40">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <AnimatePresence mode="wait">
                      {selectedIndex === index && (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="space-y-8 z-10"
                        >
                          {/* Badge with shimmer effect */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
                          >
                            <Sparkles className="h-4 w-4 text-emerald-300" />
                            <span className="text-sm font-semibold text-emerald-200">{slide.badge}</span>
                          </motion.div>

                          {/* Title with stagger animation */}
                          <motion.h1 
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                          >
                            {slide.title}{" "}
                            <span className="relative inline-block">
                              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 animate-gradient">
                                {slide.highlight}
                              </span>
                              <motion.span 
                                className="absolute bottom-2 left-0 w-full h-4 bg-gradient-to-r from-emerald-500/40 to-teal-500/40 -rotate-1 blur-sm"
                                animate={{ 
                                  scaleX: [0, 1],
                                  opacity: [0, 1]
                                }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                              />
                            </span>
                          </motion.h1>

                          <motion.p 
                            className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            {slide.description}
                          </motion.p>

                          {/* Arabic verse with glow effect */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
                          >
                            <p className="text-2xl md:text-3xl font-amiri text-right leading-relaxed mb-3 text-emerald-100">
                              {slide.verse}
                            </p>
                            <p className="text-sm text-slate-300 italic text-center">
                              {slide.verseTranslation}
                            </p>
                          </motion.div>

                          {/* CTA Buttons with hover effects */}
                          <motion.div 
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            <Button 
                              size="lg" 
                              className="group relative bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-2xl shadow-pink-500/50 px-8 overflow-hidden"
                              asChild
                            >
                              <Link href="#videos">
                                <span className="relative z-10 flex items-center gap-2">
                                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                  {slide.primaryCTA}
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                              </Link>
                            </Button>
                            <Button 
                              size="lg" 
                              className="group border-2 border-white/30 hover:bg-white/10 text-white px-8 backdrop-blur-sm bg-white/5"
                              asChild
                            >
                              <Link href="/about">
                                <BookOpen className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                                {slide.secondaryCTA}
                              </Link>
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Right - 3D Visual Effect */}
                    <AnimatePresence mode="wait">
                      {selectedIndex === index && (
                        <motion.div
                          key={`visual-${slide.id}`}
                          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                          exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="relative hidden lg:block perspective-1000"
                        >
                          <div className="relative w-full aspect-square max-w-lg mx-auto transform-gpu">
                            {/* Glassmorphic circles with 3D effect */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full backdrop-blur-sm border border-white/10 shadow-2xl"
                              animate={{ 
                                rotate: 360,
                                scale: [1, 1.05, 1]
                              }}
                              transition={{ 
                                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                              }}
                            />
                            <motion.div 
                              className="absolute inset-8 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full backdrop-blur-sm border border-white/10"
                              animate={{ 
                                rotate: -360,
                                scale: [1, 1.08, 1]
                              }}
                              transition={{ 
                                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                                scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                              }}
                            />
                            <motion.div 
                              className="absolute inset-16 bg-gradient-to-br from-emerald-400/40 to-teal-500/40 rounded-full backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner"
                              animate={{ 
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                              }}
                            >
                              <BookOpen className="h-24 w-24 text-white/80" />
                            </motion.div>
                            
                            {/* Orbiting particles */}
                            <div className="absolute inset-0">
                              {floatingDots.map((dot, i) => (
                                <motion.div
                                  key={i}
                                  className={`absolute ${dot.size} bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full shadow-lg`}
                                  style={{
                                    top: dot.top,
                                    left: dot.left,
                                  }}
                                  animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.5, 1, 0.5],
                                    scale: [1, 1.2, 1],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: parseFloat(dot.delay)
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="group p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          className="group p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </section>
  );
}
