"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const caseStudies = [
  {
    id: 1,
    title: "TECHNOLOGY",
    subtitle: "Explore Latest",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    gradient: "from-purple-600/80 to-pink-600/80",
  },
  {
    id: 2,
    title: "Classifying Best Electronic Hacks",
    subtitle: "Learn More",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    gradient: "from-pink-500/80 to-purple-600/80",
  },
  {
    id: 3,
    title: "Industry Labor Superb AI",
    subtitle: "Stay Updated",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    gradient: "from-blue-600/80 to-cyan-600/80",
  },
  {
    id: 4,
    title: "Education Super AI",
    subtitle: "Transform Learning",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    gradient: "from-cyan-500/80 to-teal-600/80",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Dotted Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle, #64748b 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} 
        />
      </div>

      {/* Gradient Overlay Circles */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 right-10 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Differentiating through case studies<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Machine learning.
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="group relative overflow-hidden cursor-pointer border-0 shadow-xl h-80 rounded-3xl">
                {/* Background Image */}
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} mix-blend-multiply`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <Badge className="w-fit mb-3 bg-white/20 backdrop-blur-sm text-white border-white/30">
                    {study.subtitle}
                  </Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {study.title}
                  </h3>
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="text-white font-semibold flex items-center gap-2"
                  >
                    Read More
                    <span>→</span>
                  </motion.div>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
