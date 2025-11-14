"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

// Updated categories/classes
const categories = [
  {
    id: 1,
    title: "Daily English & Urdu Classes",
    subtitle: "For Men",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    gradient: "from-[#453142]/80 via-[#6e4d66]/80 to-[#faf9f7]/80",
  },
  {
    id: 2,
    title: "Daily English & Urdu Classes",
    subtitle: "For Women",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    gradient: "from-[#6e4d66]/80 via-[#453142]/80 to-[#faf9f7]/80",
  },
  {
    id: 3,
    title: "Daily Tamil Classes",
    subtitle: "For Men",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    gradient: "from-[#453142]/80 via-[#faf9f7]/80 to-[#6e4d66]/80",
  },
  {
    id: 4,
    title: "Daily Tamil Classes",
    subtitle: "For Women",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    gradient: "from-[#faf9f7]/80 via-[#6e4d66]/80 to-[#453142]/80",
  },
  {
    id: 5,
    title: "Weekend Classes in English & Urdu",
    subtitle: "For Men",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    gradient: "from-[#453142]/80 via-[#faf9f7]/80 to-[#6e4d66]/80",
  },
  {
    id: 6,
    title: "Weekend Classes in English & Urdu",
    subtitle: "For Women",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    gradient: "from-[#6e4d66]/80 via-[#453142]/80 to-[#faf9f7]/80",
  },
];

// Always "Free", no stars, trending or complete
const courses = [
  {
    id: 1,
    title: "Free",
    classType: "Daily",
    category: "English & Urdu · Men",
    instructor: "Ustad Imran Sait",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop",
    students: "2.5K",
    time: "45 min",
  },
  {
    id: 2,
    title: "Free",
    classType: "Daily",
    category: "English & Urdu · Women",
    instructor: "Ustad Imran Sait",
    image: "https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?w=400&h=300&fit=crop",
    students: "2.3K",
    time: "45 min",
  },
  {
    id: 3,
    title: "Free",
    classType: "Daily",
    category: "Tamil · Men",
    instructor: "Ustad Imran Sait",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    students: "2.8K",
    time: "60 min",
  },
  {
    id: 4,
    title: "Free",
    classType: "Daily",
    category: "Tamil · Women",
    instructor: "Ustad Imran Sait",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
    students: "3.1K",
    time: "60 min",
  },
  {
    id: 5,
    title: "Free",
    classType: "Weekend",
    category: "English & Urdu · Men",
    instructor: "Ustad Imran Sait",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    students: "1.4K",
    time: "2 hrs",
  },
  {
    id: 6,
    title: "Free",
    classType: "Weekend",
    category: "English & Urdu · Women",
    instructor: "Ustad Imran Sait",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    students: "1.2K",
    time: "2 hrs",
  },
];

export default function VideoGallery() {
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);

  return (
    <section id="videos" className="py-16 md:py-24 bg-[#faf9f7] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block mb-4"
          >
            <Badge className="bg-[#453142] text-[#faf9f7] px-6 py-2 text-sm font-semibold shadow-md">
              Latest Classes
            </Badge>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#453142]">
            Live Quran Classes – Organized by Language & Group
          </h2>
        </motion.div>

        {/* Categories Grid – Language/Gender Groups */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="group relative overflow-hidden cursor-pointer border-0 shadow-xl h-full rounded-3xl">
                <div className="relative h-56">
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
                  <div className="absolute inset-0 bg-[#453142]/20 group-hover:bg-[#faf9f7]/10 transition-colors" />
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end items-start p-6">
                    <div className="relative z-10">
                      <h3 className="text-xl font-extrabold mb-1 text-[#faf9f7] group-hover:text-[#453142] transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm opacity-90 text-[#faf9f7] group-hover:text-[#faf9f7]/80">{category.subtitle}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#453142]">All Class Schedules</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 shadow-lg rounded-3xl">
                <div className="relative h-44 overflow-hidden">
                  {/* Course Image */}
                  <Image
                    src={course.image}
                    alt={course.category}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play Button Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#453142]/70 to-[#faf9f7]/70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCourse === course.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="h-8 w-8 text-[#453142] ml-1" />
                    </motion.div>
                  </motion.div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-[#453142]">{course.title}</span>
                    <Badge className="bg-[#453142] text-[#faf9f7] rounded-full px-3 py-1 capitalize text-xs">
                      {course.classType}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-base mb-2 text-[#453142] leading-snug">
                    {course.category}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#453142]/80 mb-2">
                    <User className="h-4 w-4 text-[#453142]" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#453142]/70 pt-2 border-t border-[#453142]/10">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-[#453142]" />
                      <span>{course.time}</span>
                    </div>
                    <span className="font-semibold">{course.students} Students</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
