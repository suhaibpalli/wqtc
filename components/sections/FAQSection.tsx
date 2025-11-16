"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Where Can I Find Information?",
    answer: "You can find comprehensive information about our Quran translation classes in our Resource Library, which includes video lectures, audio recordings, and eBooks. You can also visit our About Us section to learn more about our methodology and our mentor, Ustaad Imran Sait.",
    category: "General",
  },
  {
    id: 2,
    question: "What Are Your Terms And Conditions?",
    answer: "Our classes are completely free of charge. We only ask that students attend regularly and complete their assignments. By enrolling, you agree to respect the sanctity of the Quran and maintain a conducive learning environment for all participants.",
    category: "General",
  },
  {
    id: 3,
    question: "Can I Buy Directly From The Factory?",
    answer: "All our educational materials, including eBooks and translations, are available for free download from our website. We don't sell any physical products. Our mission is to make Quranic knowledge accessible to everyone without any financial barriers.",
    category: "Materials",
  },
  {
    id: 4,
    question: "What Kinds of Payment Do You Accept?",
    answer: "We don't accept any payments as all our courses and resources are completely free. However, if you wish to support our mission, you can reach out to us through our Contact page for donation information.",
    category: "Payments",
  },
  {
    id: 5,
    question: "When do I receive my order?",
    answer: "There are no physical orders. All our resources, including video classes, audio lectures, and eBooks, are available instantly for streaming or download through our Resource Library. You can access them anytime, anywhere.",
    category: "Access",
  },
  {
    id: 6,
    question: "What languages are the classes available in?",
    answer: "Our Word for Word Quran translation classes are currently available in English, Urdu, and Tamil. We're working on adding more languages to reach a wider audience and make the Quran accessible to people worldwide.",
    category: "Languages",
  },
  {
    id: 7,
    question: "How do I enroll in online courses?",
    answer: "You can enroll in our free online courses by visiting the 'Online Courses' section and choosing between courses for Men, Women, or Weekend classes. Fill out the registration form and you'll receive joining details via email within 24 hours.",
    category: "Enrollment",
  },
  {
    id: 8,
    question: "Are the courses suitable for beginners?",
    answer: "Absolutely! Our Word for Word methodology is designed specifically for beginners. You don't need any prior knowledge of Arabic or Quranic studies. Ustaad Imran Sait's unique teaching approach makes understanding the Quran natural and accessible for everyone.",
    category: "Learning",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf9f7] to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#453142] text-[#faf9f7] px-4 py-1">
            F.A.Q
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-[#453142] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#453142]/70 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our Quran translation classes and resources
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#453142]/40" />
            <Input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-6 text-base border-[#453142]/20 focus:border-[#453142] focus:ring-[#453142] bg-white shadow-sm"
            />
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-[#453142]/10 hover:border-[#453142]/30 transition-all duration-300 shadow-sm hover:shadow-md bg-white">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4 group"
                      aria-expanded={openId === faq.id}
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#453142]/10 flex items-center justify-center group-hover:bg-[#453142]/20 transition-colors">
                          <HelpCircle className="h-5 w-5 text-[#453142]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#453142] group-hover:text-[#6e4d66] transition-colors">
                            {faq.question}
                          </h3>
                          {faq.category && (
                            <span className="text-xs text-[#453142]/60 mt-1 inline-block">
                              {faq.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: openId === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="h-5 w-5 text-[#453142]/60" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pl-20">
                            <p className="text-[#453142]/80 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-[#453142]/60 text-lg">
                No questions found matching your search. Try different keywords.
              </p>
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-[#453142]/70 mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#453142] text-[#faf9f7] px-6 py-3 rounded-lg hover:bg-[#5a3f54] transition-colors font-medium shadow-lg hover:shadow-xl"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
