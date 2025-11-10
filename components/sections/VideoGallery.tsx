"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, User, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const categories = [
  {
    id: 1,
    title: "TECHNOLOGY",
    subtitle: "Explore Latest",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    gradient: "from-purple-600/80 via-pink-600/80 to-red-600/80",
  },
  {
    id: 2,
    title: "Classifying Best Electronic Hacks",
    subtitle: "Learn & Grow",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    gradient: "from-pink-500/80 via-purple-500/80 to-indigo-600/80",
  },
  {
    id: 3,
    title: "Industry Labor Superb AI",
    subtitle: "Stay Updated",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    gradient: "from-blue-600/80 via-cyan-600/80 to-teal-600/80",
  },
  {
    id: 4,
    title: "Education Super AI",
    subtitle: "Transform Life",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    gradient: "from-cyan-500/80 via-teal-500/80 to-green-600/80",
  },
];

const courses = [
  {
    id: 1,
    title: "Surah 107, Al-Ma'un, 1-7",
    instructor: "Ustad Imran Sait",
    category: "Beginner",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    price: "Free",
    rating: 5,
    students: "2.5K",
    lessons: "Complete",
    trending: true,
  },
  {
    id: 2,
    title: "Surah 106, Quraysh, 1-4",
    instructor: "Ustad Imran Sait",
    category: "Advanced",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop",
    price: "Free",
    rating: 5,
    students: "2.3K",
    lessons: "Complete",
    trending: false,
  },
  {
    id: 3,
    title: "Surah 105, Al-Fil, 1-5",
    instructor: "Ustad Imran Sait",
    category: "Beginner",
    image: "https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?w=400&h=300&fit=crop",
    price: "Free",
    rating: 5,
    students: "2.8K",
    lessons: "Complete",
    trending: true,
  },
  {
    id: 4,
    title: "Surah 114, An-Nas, 1-6",
    instructor: "Ustad Imran Sait",
    category: "Expert",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    price: "Free",
    rating: 5,
    students: "3.1K",
    lessons: "Complete",
    trending: false,
  },
];

export default function VideoGallery() {
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);

  return (
    <section id="videos" className="py-16 md:py-24 bg-white relative overflow-hidden">
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
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-sm font-semibold">
              Latest Videos
            </Badge>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Differentiating through case studies<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Machine learning.
            </span>
          </h2>
        </motion.div>

        {/* Categories Grid with Real Images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="group relative overflow-hidden cursor-pointer border-0 shadow-xl h-full">
                <div className="relative h-64">
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="relative z-10 text-white">
                      <h3 className="text-2xl font-bold mb-2 transform group-hover:translate-x-2 transition-transform">
                        {category.title}
                      </h3>
                      <p className="text-sm opacity-90 flex items-center gap-2">
                        {category.subtitle}
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          →
                        </motion.span>
                      </p>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Courses Section with Real Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Our online courses</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  {/* Course Image */}
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Badges */}
                  {course.trending && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white z-10 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </Badge>
                  )}
                  
                  <Badge className="absolute top-3 left-3 bg-blue-500 z-10">{course.category}</Badge>
                  
                  {/* Play Button Overlay */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-600/90 to-teal-600/90 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCourse === course.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="h-10 w-10 text-emerald-600 fill-emerald-600 ml-1" />
                    </motion.div>
                  </motion.div>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <motion.span 
                      className="text-2xl font-bold text-emerald-600"
                      animate={{ scale: hoveredCourse === course.id ? 1.1 : 1 }}
                    >
                      {course.price}
                    </motion.span>
                    <div className="flex items-center gap-1">
                      {[...Array(course.rating)].map((_, i) => (
                        <motion.svg 
                          key={i} 
                          className="w-4 h-4 fill-yellow-400"
                          viewBox="0 0 20 20"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </motion.svg>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors min-h-[56px]">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                    <User className="h-4 w-4 text-emerald-600" />
                    <span>{course.instructor}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-600 pt-3 border-t">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-emerald-600" />
                      <span>{course.lessons}</span>
                    </div>
                    <span className="font-semibold text-emerald-600">{course.students} Students</span>
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
