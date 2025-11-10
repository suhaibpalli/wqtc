"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const footerLinks = {
  usefulLinks: [
    { label: "Market", href: "#" },
    { label: "Our teams", href: "#" },
    { label: "About Us", href: "/about" },
    { label: "Features", href: "#" },
  ],
  course: [
    { label: "Ui/Ux Design", href: "#" },
    { label: "WordPress", href: "#" },
    { label: "App Design", href: "#" },
    { label: "Consult", href: "#" },
  ],
  recentPost: [
    { title: "Top Rated Course", date: "04 Oct, 2023" },
    { title: "Best Rated Course", date: "04 Oct, 2023" },
    { title: "Big Offer Course", date: "04 Oct, 2023" },
  ],
};

const socialLinks = [
  { href: "https://www.facebook.com/profile.php?id=100093641951236", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/wqtc2024", icon: Instagram, label: "Instagram" },
  { href: "https://www.youtube.com/@WQTC-Chennai", icon: Youtube, label: "YouTube" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Still You Need Our <span className="text-emerald-400">Support</span> ?
              </h3>
              <p className="text-slate-400">
                Don't wait make a smart & logical quote here. Its pretty easy.
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 shadow-lg shadow-purple-500/50"
              size="lg"
            >
              Contact Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold font-amiri text-xl">[translate:و]</span>
              </div>
              <span className="font-bold text-xl text-white">WQTC</span>
            </div>
            <p className="text-sm leading-relaxed">
              Word for Word Quran Translation Classes - Making the Quran accessible to everyone through innovative teaching methods by Ustaad Imran Sait.
            </p>
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="bg-slate-800 border-slate-700 hover:bg-emerald-600 hover:border-emerald-600 transition-colors"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Useful Links</h3>
            <ul className="space-y-2">
              {footerLinks.usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-emerald-400">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Course */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Course</h3>
            <ul className="space-y-2">
              {footerLinks.course.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-emerald-400">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Post */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Recent Post</h3>
            <div className="space-y-4">
              {footerLinks.recentPost.map((post, index) => (
                <div key={index} className="flex gap-3 group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-500">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-slate-400">
            © 2025 WQTC. All Rights Reserved. | Developed by{" "}
            <a href="http://delqsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              DELQ
            </a>
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
