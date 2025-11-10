"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/library", label: "Library" },
  { href: "/join", label: "Join for free" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.facebook.com/profile.php?id=100093641951236", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/wqtc2024", icon: Instagram, label: "Instagram" },
  { href: "https://www.youtube.com/@WQTC-Chennai", icon: Youtube, label: "YouTube" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/50 transition-shadow">
              <span className="text-white font-bold font-amiri text-xl">[translate:و]</span>
            </div>
            <span className="font-bold text-xl hidden sm:block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              WQTC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-emerald-600 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Social Icons & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button 
                  key={social.label}
                  variant="ghost" 
                  size="icon" 
                  asChild
                  className="hover:text-emerald-600 hover:bg-emerald-50"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 border-t pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-3 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <Button 
                  key={social.label}
                  variant="outline" 
                  size="icon"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
