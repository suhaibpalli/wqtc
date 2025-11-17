// components/layout/SideSheetContent.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=100093641951236",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/wqtc2024",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://www.youtube.com/@WQTC-Chennai",
    icon: Youtube,
    label: "YouTube",
  },
];

export default function SideSheetContent() {
  return (
    <aside
      className="space-y-6 bg-[#faf9f7] p-4 rounded-xl"
      style={{
        color: "#453142",
      }}
    >
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#b187fc]">Word For Word Quran</p>
        <h2 className="text-2xl font-semibold mt-2" style={{ color: "#453142" }}>
          Understand the Quran, one word at a time
        </h2>
      </div>

      <div className="relative w-full h-44 rounded-xl overflow-hidden ring-1 ring-[#453142]/10">
        <Image
          src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80"
          alt="Students learning the Quran"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
      </div>

      <p className="text-sm" style={{ color: "#635a56" }}>
        We help learners internalize the message of the Quran through immersive,
        word-for-word programs, interactive tajweed sessions, and curated
        resources for every stage of the journey. Join a global community that
        learns, reflects, and lives the Quran together.
      </p>

      <div className="space-y-3 rounded-xl border border-[#453142]/10 bg-[#453142]/5 p-4">
        <p className="text-xs uppercase tracking-wide text-[#b187fc]">Featured Pathway</p>
        <h3 className="text-lg font-semibold" style={{ color: "#453142" }}>
          30-Day Arabic Roots Sprint
        </h3>
        <p className="text-sm" style={{ color: "#635a56" }}>
          Master the most common Quranic roots with live cohorts, guided practice,
          and reflective assignments.
        </p>
        <Button
          asChild
          className="w-full bg-[#b187fc] text-[#453142] hover:bg-[#cdabff]"
        >
          <Link href="/online-courses">Explore Courses</Link>
        </Button>
      </div>

      <hr className="border-[#453142]/10" />

      <div>
        <h3 className="font-semibold mb-2" style={{ color: "#453142" }}>
          We Are Social
        </h3>
        <div className="flex gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              className="p-2 rounded-full bg-[#453142]/10 text-[#453142] hover:bg-[#453142]/20 transition"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" style={{ color: "#453142" }} />
            </a>
          ))}
        </div>
      </div>

      <hr className="border-[#453142]/10" />

      <div className="text-sm space-y-1" style={{ color: "#635a56" }}>
        <h3 className="font-semibold" style={{ color: "#453142" }}>Contact Us</h3>
        <p>+91 44 4776 6611</p>
        <p>info@wordforwordquran.com</p>
      </div>
    </aside>
  );
}
