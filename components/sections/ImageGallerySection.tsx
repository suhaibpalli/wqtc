"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    alt: "Learning Technology",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    alt: "AI Education",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=600&h=400&fit=crop",
    alt: "Virtual Learning",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    alt: "Technology",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    alt: "Innovation",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    alt: "Future Learning",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
    alt: "Digital Education",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    alt: "Modern Learning",
  },
];

export default function ImageGallerySection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-square overflow-hidden rounded-2xl shadow-xl cursor-pointer"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
