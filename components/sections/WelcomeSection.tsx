"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Users, Play, Sparkles, Video, Globe } from "lucide-react";

// Pre-defined particle positions (no randomness during render)
const PARTICLES = [
  { top: "10%", left: "15%" },
  { top: "20%", left: "80%" },
  { top: "35%", left: "25%" },
  { top: "45%", left: "70%" },
  { top: "55%", left: "40%" },
  { top: "65%", left: "85%" },
  { top: "75%", left: "20%" },
  { top: "85%", left: "60%" },
  { top: "15%", left: "50%" },
  { top: "25%", left: "90%" },
  { top: "40%", left: "10%" },
  { top: "50%", left: "55%" },
  { top: "60%", left: "30%" },
  { top: "70%", left: "75%" },
  { top: "80%", left: "45%" },
  { top: "90%", left: "65%" },
  { top: "12%", left: "35%" },
  { top: "30%", left: "95%" },
  { top: "48%", left: "5%" },
  { top: "68%", left: "50%" },
];

export default function WelcomeSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Decorative background dots pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image Card with Robot/AI Teacher */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl rounded-3xl group">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600" />
              
              {/* Animated particles overlay */}
              <div className="absolute inset-0">
                {PARTICLES.map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: particle.top,
                      left: particle.left,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>

              <CardContent className="relative p-8 md:p-12">
                {/* AI Robot/Teacher illustration placeholder */}
                <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                  <div className="text-center space-y-4">
                    <motion.div 
                      className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <BookOpen className="w-16 h-16 text-white" />
                    </motion.div>
                    <p className="text-white font-semibold text-xl">
                      AI-Powered Learning
                    </p>
                  </div>
                </div>

                {/* Floating stats badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 right-8 bg-white rounded-full px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-sm">5K+ Students</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-1.5">
              <Sparkles className="w-3 h-3 mr-1" />
              Welcome to the online Learning Center
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-slate-900">
                Our Best Instructor to give About Future
              </span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed">
              Learn the Qur'an translation through our innovative Word for Word method. 
              Our experienced instructors, led by Ustaad Imran Sait, make understanding 
              the Quran accessible to everyone through structured, interactive online classes.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Classes
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8"
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
                  gradient: "from-blue-500 to-cyan-500"
                },
                { 
                  label: "Classes", 
                  value: "200+", 
                  icon: Video,
                  gradient: "from-purple-500 to-pink-500"
                },
                { 
                  label: "Languages", 
                  value: "3", 
                  icon: Globe,
                  gradient: "from-green-500 to-emerald-500"
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
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
