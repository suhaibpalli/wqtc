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
    <footer className="bg-[#453142] text-[#faf9f7]">
      {/* Newsletter CTA */}
      <div className="border-b border-[#faf9f7]/15">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#faf9f7] mb-2">
                Still You Need Our <span className="text-[#6e4d66]">Support</span> ?
              </h3>
              <p className="text-[#faf9f7]/80">
                Don't wait – reach out today for a smart & logical quote. It's easy!
              </p>
            </div>
            <Button
              className="bg-[#faf9f7] text-[#453142] hover:bg-[#e6e1df] px-8 shadow-lg font-semibold"
              size="lg"
            >
              Contact Now
            </Button>
          </div>
        </div>
      </div>
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#453142] to-[#6e4d66] flex items-center justify-center shadow">
                <span className="text-[#faf9f7] font-bold font-amiri text-xl">[translate:و]</span>
              </div>
              <span className="font-bold text-xl text-[#faf9f7]">WQTC</span>
            </div>
            <p className="text-sm leading-relaxed text-[#faf9f7]/80">
              Word for Word Quran Translation Classes – Making the Quran accessible to everyone through innovative teaching methods by Ustaad Imran Sait.
            </p>
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="bg-[#6e4d66] hover:bg-[#faf9f7] border-0 hover:text-[#453142] text-[#faf9f7] transition-colors"
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
            <h3 className="text-[#faf9f7] font-bold text-lg">Useful Links</h3>
            <ul className="space-y-2">
              {footerLinks.usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#faf9f7] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#6e4d66]">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Course */}
          <div className="space-y-4">
            <h3 className="text-[#faf9f7] font-bold text-lg">Course</h3>
            <ul className="space-y-2">
              {footerLinks.course.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#faf9f7] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#6e4d66]">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Recent Post */}
          <div className="space-y-4">
            <h3 className="text-[#faf9f7] font-bold text-lg">Recent Posts</h3>
            <div className="space-y-4">
              {footerLinks.recentPost.map((post, index) => (
                <div key={index} className="flex gap-3 group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#453142] to-[#6e4d66] rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#faf9f7] group-hover:text-[#6e4d66] transition-colors line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <p className="text-xs text-[#faf9f7]/60">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-[#faf9f7]/15" />
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-[#faf9f7]/70">
            © 2025 WQTC. All Rights Reserved. | Developed by{" "}
            <a href="http://delqsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-[#6e4d66] hover:underline">
              DELQ
            </a>
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#6e4d66] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#6e4d66] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
