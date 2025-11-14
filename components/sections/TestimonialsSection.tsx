"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Tajuddin",
    content:
      "I have been attending morning Quran class after Fajr for the past few years. My life has completely changed after attending this class. By the grace of Allah, I never missed Fajr salah.",
    initials: "T",
    role: "Student",
  },
  {
    id: 2,
    name: "Asraruddin Elias",
    content:
      "This course has given me an opportunity to learn and comprehend Allah's message. The dedication demonstrated in teaching is most impressive. I consider myself privileged.",
    initials: "AE",
    role: "Student",
  },
  {
    id: 3,
    name: "Syed Abbas Ibrahim",
    content:
      "It is very much useful to understand the Quran with my native language. The explanations are very much useful to us. A golden opportunity not to miss.",
    initials: "SI",
    role: "Student",
  },
];

export default function TestimonialsSection() {
  const [selected, setSelected] = useState(0);
  const testimonial = testimonials[selected];

  const prevTestimonial = () =>
    setSelected((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const nextTestimonial = () =>
    setSelected((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf9f7] to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#453142] text-[#faf9f7]">Testimonials</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#453142]">
            Client Testimonial
          </h2>
          <p className="text-[#453142]/80 text-lg max-w-2xl mx-auto">
            Hear from our students about their life-transforming experiences learning Quran translation.
          </p>
        </motion.div>
        <div className="flex items-center justify-center w-full">
          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-[#faf9f7] border border-[#453142]/20 shadow-md hover:bg-[#453142]/10 transition-colors mx-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-[#453142]" />
          </button>
          {/* Animated Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl"
            >
              <Card className="shadow-xl rounded-3xl bg-[#faf9f7] border-0 relative px-2 py-2">
                <CardContent className="pt-8 pb-8 px-8 flex flex-col items-center">
                  <Quote className="h-12 w-12 text-[#453142] opacity-40 mb-4" />
                  <p className="text-[#453142]/90 mb-8 text-lg leading-relaxed text-center">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-[#453142]/10 w-full justify-center">
                    <Avatar className="w-14 h-14 shadow">
                      <AvatarFallback className="bg-gradient-to-br from-[#453142] to-[#faf9f7] text-[#faf9f7] font-semibold text-xl">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-[#453142]">{testimonial.name}</p>
                      <p className="text-sm text-[#453142]/80">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          {/* Right Arrow */}
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-[#faf9f7] border border-[#453142]/20 shadow-md hover:bg-[#453142]/10 transition-colors mx-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-[#453142]" />
          </button>
        </div>
      </div>
    </section>
  );
}
