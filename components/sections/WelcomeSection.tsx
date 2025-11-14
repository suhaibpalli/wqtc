"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Play, Video, Globe } from "lucide-react";
import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf9f7] via-[#f5f3f0] to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Teacher Image (plain, no card/bg) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-2xl mx-auto"> {/* increased from max-w-lg to max-w-2xl */}
              <Image
                src="https://wordforwordquran.com/assets/q/mainbanner.png"
                alt="Ustaad Imran Sait - Quran Teacher"
                width={1200} // increased from 800
                height={1200} // increased from 800
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#453142]">
              Our Best Instructor to guide About Future
            </h2>

            <p className="text-[#453142]/80 text-lg leading-relaxed">
              Learn the Qur'an translation through our innovative Word for Word method. 
              Our experienced instructors, led by Ustaad Imran Sait, make understanding 
              the Quran accessible to everyone through structured, interactive online classes.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-[#453142] hover:bg-[#5a3f54] text-[#faf9f7] px-8 shadow-lg transition-all"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Classes
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#453142] text-[#453142] hover:bg-[#453142] hover:text-[#faf9f7] px-8 transition-all"
              >
                Learn More
              </Button>
            </div>

            {/* Mini stats with animated icons */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { 
                  label: "Students", 
                  value: "5K+", 
                  icon: Users,
                  gradient: "from-[#453142] to-[#5a3f54]"
                },
                { 
                  label: "Classes", 
                  value: "200+", 
                  icon: Video,
                  gradient: "from-[#5a3f54] to-[#6e4d66]"
                },
                { 
                  label: "Languages", 
                  value: "3", 
                  icon: Globe,
                  gradient: "from-[#6e4d66] to-[#453142]"
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  {/* Animated Icon Container */}
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.2
                    }}
                    className="mb-3 flex justify-center"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-8 h-8 text-[#faf9f7]" />
                    </div>
                  </motion.div>
                  
                  <div className="text-2xl font-bold text-[#453142]">{stat.value}</div>
                  <div className="text-sm text-[#453142]/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
