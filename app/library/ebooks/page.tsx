'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Search, X, Download } from 'lucide-react';
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
    title: 'Juz 1 - الم (Alif Laam Meem)',
    filename: 'Juz_1_WQTC English Translation.pdf',
    coverImage: '/cover_pages/WhatsApp Image 2025-11-15 at 14.44.48.jpeg',
    description: 'Word for Word English Translation of Juz 1 (Surah Al-Fatihah and Al-Baqarah)',
    pages: 30
  }
];

export default function EBooksPage() {
  const [selectedEbook, setSelectedEbook] = useState<EBook | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredBookId, setHoveredBookId] = useState<number | null>(null);

  const filteredEbooks = ebooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Download handler for PDF files in /public/pdfs/
  const handleDownload = (filename: string) => {
    const fileUrl = `/pdfs/${filename}`;
    // Create an invisible anchor and click it
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                {/* Animated Book Cover using basic CSS 3D for "opening" effect */}
                <div
                  className="relative aspect-[3/4] bg-gradient-to-br from-[#453142] to-[#6e4d66] flex items-center justify-center cursor-pointer perspective-[800px]"
                  onClick={() => setSelectedEbook(book)}
                  onMouseEnter={() => setHoveredBookId(book.id)}
                  onMouseLeave={() => setHoveredBookId(null)}
                  style={{ minHeight: '0px' }}
                >
                  {book.coverImage ? (
                    <div
                      className={`relative w-full h-full transition-transform duration-500 ease-in-out`}
                      style={{
                        transformStyle: "preserve-3d",
                        transform:
                          hoveredBookId === book.id
                            ? "rotateY(-36deg) scale(1.06)" // 36deg is ~1/5th of 180, looks like a flipped book being held slightly open
                            : "none"
                      }}
                    >
                      {/* Cover (front face) */}
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="object-cover w-full h-full rounded-md"
                        style={{
                          backfaceVisibility: 'hidden',
                          boxShadow: hoveredBookId === book.id ? '2px 6px 32px #0000002a' : 'none'
                        }}
                      />
                      {/* Page shadow effect when hovered (simulating book thickness/paper) */}
                      <div
                        className="absolute right-0 top-0 h-full w-2 rounded-r-md"
                        style={{
                          opacity: hoveredBookId === book.id ? 0.18 : 0,
                          background: 'linear-gradient(to right,rgba(255,255,255,0),#b8a4bb 70%)',
                          transition: 'opacity 0.2s'
                        }}
                      />
                      {/* "Inner pages" simulation when hovered */}
                      {hoveredBookId === book.id && (
                        <div
                          className="absolute left-1 top-2 bottom-2 w-[7%] rounded-md"
                          style={{
                            background: 'linear-gradient(120deg,#fff,#f6f2f8 80%)',
                            boxShadow: '0px 0px 10px #f8ebfc84',
                            opacity: 0.8,
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className={`relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-in-out`}
                      style={{
                        transformStyle: "preserve-3d",
                        transform:
                          hoveredBookId === book.id
                            ? "rotateY(-36deg) scale(1.06)"
                            : "none"
                      }}
                    >
                      <BookOpen className="w-24 h-24 text-[#faf9f7]/50" />
                      {/* Page shadow and inner pages for icon as well */}
                      <div
                        className="absolute right-0 top-0 h-full w-2 rounded-r-md"
                        style={{
                          opacity: hoveredBookId === book.id ? 0.18 : 0,
                          background: 'linear-gradient(to right,rgba(255,255,255,0),#b8a4bb 70%)',
                          transition: 'opacity 0.2s'
                        }}
                      />
                      {hoveredBookId === book.id && (
                        <div
                          className="absolute left-1 top-2 bottom-2 w-[7%] rounded-md"
                          style={{
                            background: 'linear-gradient(120deg,#fff,#f6f2f8 80%)',
                            boxShadow: '0px 0px 10px #f8ebfc84',
                            opacity: 0.8,
                          }}
                        />
                      )}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center pointer-events-none z-10">
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

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 bg-[#453142] text-white hover:bg-[#2d1c26]"
                      onClick={() => setSelectedEbook(book)}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#453142]/30 text-[#453142] hover:bg-[#453142]/5"
                      onClick={() => handleDownload(book.filename)}
                      type="button"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
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
              // pass download handler to modal if you want to put download in modal header too
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Flipbook Modal Component
function FlipbookModal({
  ebook,
  onClose,
}: {
  ebook: EBook;
  onClose: () => void;
}) {
  // Download handler for modal
  const handleDownload = () => {
    const fileUrl = `/pdfs/${ebook.filename}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = ebook.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <div className="flex items-center gap-4">
            {ebook.coverImage && (
              <img
                src={ebook.coverImage}
                alt={ebook.title}
                className="w-16 h-20 object-cover rounded shadow-md"
              />
            )}
            <div>
              <h2 className="text-xl font-bold text-[#453142]">{ebook.title}</h2>
              <p className="text-sm text-[#453142]/70 mt-1">
                {ebook.description}
              </p>
            </div>
          </div>
          {/* Only show the Download button with text, and Close button */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#453142]/30 text-[#453142] hover:bg-[#453142]/5 flex items-center gap-2"
              onClick={handleDownload}
              type="button"
              aria-label="Download"
            >
              <Download className="h-5 w-5" />
              <span>Download</span>
            </Button>
            <button
              onClick={onClose}
              className="text-[#453142] hover:bg-[#453142]/10 rounded-full p-2 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Flipbook Container */}
        <div className="h-[calc(100%-80px)] overflow-hidden">
          <PDFFlipbook filename={ebook.filename} />
        </div>
      </motion.div>
    </motion.div>
  );
}
