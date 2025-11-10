"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    date: "03/05/2024",
    title: "USA Tour May-2024 | Jumma Khutbah",
    location: "Islamic Association of Allen",
    type: "past",
  },
  {
    id: 2,
    date: "25/04/2024",
    title: "Word For Word Concept of Learning Quran",
    location: "Islamic Community Center of Des Plaines",
    type: "past",
  },
  {
    id: 3,
    date: "16/07/2023",
    title: "Guest Lecture - Understanding Quran",
    location: "Masjid Jafar, Atlanta USA",
    type: "past",
  },
];

export default function NoticesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Recent / Upcoming Events
          </h2>
          <p className="text-slate-600 text-lg">
            Join our sessions and lectures worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">Past Event</Badge>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 min-h-[56px]">
                    {event.title}
                  </h3>
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                    <span>{event.location}</span>
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
