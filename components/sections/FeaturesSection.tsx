"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Languages, Globe, ChevronRight } from "lucide-react";

// Define language cards
const languages = [
  {
    name: "English",
    description: "Free Online Quran Classes in English. Learn Quran online with qualified teachers.",
    icon: BookOpen,
    color: "bg-[#453142]/10 text-[#453142]",
    highlight: "EN",
  },
  {
    name: "Urdu",
    // Use translation markup for Urdu text
    description: "[translate:اردو میں مفت آن لائن قرآن کلاسز\nاپنے گھر کے آرام سے آن لائن قرآن سیکھیں، ہمارے ماہر اساتذہ کی رہنمائی میں۔]",
    icon: Languages,
    color: "bg-[#453142]/10 text-[#453142]",
    highlight: "اردو",
  },
  {
    name: "Tamil",
    // Use translation markup for Tamil text
    description: "[translate:இலவச ஆன்லைன் குர்ஆன் வகுப்புகள்\nஉங்கள் வீட்டில் இருந்து விரிவான வகுப்புகள், ஆசிரியர்களுடன்.]",
    icon: Globe,
    color: "bg-[#453142]/10 text-[#453142]",
    highlight: "தமிழ்",
  },
  {
    name: "Other",
    description: "Want classes in a different language? Reach out for more options and support.",
    icon: ChevronRight,
    color: "bg-[#453142]/10 text-[#453142]",
    highlight: "Other",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf9f7] via-[#f5f3f0] to-white relative overflow-hidden">
      {/* Attractive gradient mesh and dotted overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 right-0 w-2/3 h-full bg-gradient-to-br from-[#453142]/40 via-[#6e4d66]/20 to-[#faf9f7]/20 blur-3xl rounded-full"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(69,49,66,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "26px 26px",
          }}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-[#453142]">
            Find Your Quran Class by Language
          </h2>
          <p className="text-lg text-[#453142]/80">
            Join online Quran courses in English, Urdu, Tamil, or more—accessible to everyone.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 h-full bg-white rounded-3xl">
                <CardContent className="p-6 space-y-4">
                  <motion.div
                    animate={{ scale: [1, 1.12, 1], rotate: [0, 9, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                    className={`w-14 h-14 ${lang.color} rounded-full flex items-center justify-center shadow-md mx-auto mb-2`}
                  >
                    <lang.icon className="w-7 h-7" />
                  </motion.div>
                  <div className="text-center">
                    <div className="font-extrabold text-lg text-[#453142] mb-1">{lang.name}</div>
                    <div className="inline-block text-xs bg-[#453142]/10 text-[#453142] py-1 px-3 rounded-full mb-2 font-semibold">
                      {lang.highlight}
                    </div>
                  </div>
                  {/* Maintain correct markup for translation in descriptions */}
                  <div className="text-[#453142]/85 text-sm leading-relaxed text-center min-h-[52px]">
                    {lang.name === "Urdu" ? (
                      <span>[translate:اردو میں مفت آن لائن قرآن کلاسز<br/>اپنے گھر کے آرام سے آن لائن قرآن سیکھیں، ہمارے ماہر اساتذہ کی رہنمائی میں۔]</span>
                    ) : lang.name === "Tamil" ? (
                      <span>[translate:இலவச ஆன்லைன் குர்ஆன் வகுப்புகள்<br/>உங்கள் வீட்டில் இருந்து விரிவான வகுப்புகள், ஆசிரியர்களுடன்.]</span>
                    ) : (
                      lang.description
                    )}
                  </div>
                  <button
                    className="w-full mt-2 py-2 rounded-xl bg-[#453142] text-[#faf9f7] font-semibold text-sm hover:bg-[#5a3f54] transition-all"
                  >
                    View Classes
                  </button>
                </CardContent>
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#faf9f7]/0 to-[#453142]/10 group-hover:from-[#6e4d66]/5 group-hover:to-[#453142]/25 transition-all duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
