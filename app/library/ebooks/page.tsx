'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled to avoid DOMMatrix error
const PDFFlipbook = dynamic(() => import('@/components/flipbook/PDFFlipbook'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#453142] border-r-transparent mb-4"></div>
        <p className="text-[#453142]">Loading PDF viewer...</p>
      </div>
    </div>
  ),
});

interface EBook {
  id: number;
  title: string;
  filename: string;
  coverImage?: string;
  description?: string;
  pages?: number;
}

// Sample ebooks - you can later fetch from API/database
const ebooks: EBook[] = [
  {
    id: 1,
    title: 'Juz 1 - WQTC English Translation',
    filename: 'Juz_1_WQTC English Translation.pdf',
    description: 'Word for Word English Translation of Juz 1',
    pages: 30
  }
];

export default function EBooksPage() {
  const [selectedEbook, setSelectedEbook] = useState<EBook | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEbooks = ebooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf9f7] py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#453142] text-[#faf9f7]">eBook Library</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#453142] mb-4">
            Quran eBook Library
          </h1>
          <p className="text-[#453142]/80 text-lg">
            Browse and read our collection of Quran translations
          </p>
        </motion.div>

        {/* Search */}
        <Card className="mb-8 border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#453142]/50" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ebooks..."
                className="w-full pl-10 pr-4 py-2 border border-[#453142]/20 rounded-md focus:ring-2 focus:ring-[#453142] focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* eBooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEbooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Card
                className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                onClick={() => setSelectedEbook(book)}
              >
                {/* Book Cover */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-[#453142] to-[#6e4d66] flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-[#faf9f7]/50" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#faf9f7] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <BookOpen className="w-8 h-8 text-[#453142]" />
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <CardContent className="p-4">
                  <h3 className="font-semibold text-[#453142] line-clamp-2 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-[#453142]/70 line-clamp-2">
                    {book.description}
                  </p>
                  {book.pages && (
                    <p className="text-xs text-[#453142]/50 mt-2">
                      {book.pages} pages
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredEbooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#453142]/70 text-lg">
              No ebooks found. Try adjusting your search.
            </p>
          </div>
        )}

        {/* Flipbook Modal */}
        <AnimatePresence>
          {selectedEbook && (
            <FlipbookModal
              ebook={selectedEbook}
              onClose={() => setSelectedEbook(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Flipbook Modal Component
function FlipbookModal({ ebook, onClose }: { ebook: EBook; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-lg w-full max-w-7xl h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#453142]/20">
          <div>
            <h2 className="text-xl font-bold text-[#453142]">{ebook.title}</h2>
            <p className="text-sm text-[#453142]/70 mt-1">{ebook.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#453142] hover:bg-[#453142]/10 rounded-full p-2 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Flipbook Container */}
        <div className="h-[calc(100%-80px)] overflow-hidden">
          <PDFFlipbook filename={ebook.filename} />
        </div>
      </motion.div>
    </motion.div>
  );
}
