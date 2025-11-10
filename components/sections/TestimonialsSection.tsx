"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Tajuddin",
    content: "I have been attending morning Quran class after Fajr for the past few years. My life has completely changed after attending this class. By the grace of Allah, I never missed Fajr salah.",
    initials: "T",
    role: "Student",
  },
  {
    id: 2,
    name: "Asraruddin Elias",
    content: "This course has given me an opportunity to learn and comprehend Allah's message. The dedication demonstrated in teaching is most impressive. I consider myself privileged.",
    initials: "AE",
    role: "Student",
  },
  {
    id: 3,
    name: "Syed Abbas Ibrahim",
    content: "It is very much useful to understand the Quran with my native language. The explanations are very much useful to us. A golden opportunity not to miss.",
    initials: "SI",
    role: "Student",
  },
];

const avatarImages = [
  { initials: "JK", position: "top-10 right-20" },
  { initials: "MR", position: "top-40 right-10" },
  { initials: "FH", position: "bottom-40 right-16" },
  { initials: "ZA", position: "bottom-20 right-32" },
  { initials: "NK", position: "top-20 left-10" },
  { initials: "SA", position: "bottom-10 left-20" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Floating avatars */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {avatarImages.map((avatar, index) => (
          <div key={index} className={`absolute ${avatar.position}`}>
            <Avatar className="w-12 h-12 border-2 border-white shadow-lg animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
              <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                {avatar.initials}
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Client Testimonial About<br />Our Lms Agency
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Hear from our students about their life-transforming experiences learning Quran translation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6 pb-6 px-6">
                  <Quote className="h-10 w-10 text-emerald-600 mb-4 opacity-50" />
                  <p className="text-slate-700 mb-6 line-clamp-4 min-h-[96px] text-sm leading-relaxed">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                    </div>
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
