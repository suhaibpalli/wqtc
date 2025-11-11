"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Glasses, CloudCog, Cpu } from "lucide-react";

const features = [
  {
    title: "AI Automation",
    description: "Learn Quran translation with AI-assisted pronunciation and memorization tools",
    icon: Brain,
    iconBg: "bg-blue-50",
    gradient: "from-blue-500 to-cyan-500",
    color: "blue",
  },
  {
    title: "Virtual Reality",
    description: "Immersive learning experience with interactive Quranic Arabic lessons",
    icon: Glasses,
    iconBg: "bg-purple-50",
    gradient: "from-purple-500 to-pink-500",
    color: "purple",
  },
  {
    title: "Machine Learning",
    description: "Personalized learning path based on your progress and understanding",
    icon: Cpu,
    iconBg: "bg-green-50",
    gradient: "from-green-500 to-emerald-500",
    color: "green",
  },
  {
    title: "AI Cloud Services",
    description: "Access your lessons anywhere with cloud-synced progress tracking",
    icon: CloudCog,
    iconBg: "bg-cyan-50",
    gradient: "from-cyan-500 to-teal-500",
    color: "cyan",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-300 via-cyan-200 to-green-300 rounded-full blur-3xl"
        />
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #8882 1px, transparent 1px),
              linear-gradient(to bottom, #8882 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Circles */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-2xl pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Provide It & Technology<br />
            Subject For You
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 h-full bg-white/80 backdrop-blur-sm rounded-3xl">
                <CardContent className="p-6 space-y-4">
                  {/* Animated Icon with Gradient */}
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className={`w-20 h-20 ${feature.iconBg} rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <feature.icon
                      className={`w-10 h-10 text-${feature.color}-600 group-hover:text-white transition-colors duration-300 relative z-10`}
                    />
                  </motion.div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  <button
                    className={`text-${feature.color}-600 font-semibold text-sm hover:text-${feature.color}-700 transition-colors flex items-center gap-1 group/link`}
                  >
                    View Subject
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </CardContent>

                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
