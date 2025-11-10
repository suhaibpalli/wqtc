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
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />

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
              <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 h-full bg-white rounded-3xl">
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
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <feature.icon
                      className={`w-10 h-10 text-${feature.color}-600 group-hover:text-white transition-colors duration-300 relative z-10`}
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Link */}
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
