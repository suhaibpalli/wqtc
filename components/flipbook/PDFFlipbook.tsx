'use client';

import { useEffect, useRef, useState, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFFlipbookProps {
  filename: string;
}

interface PageProps {
  pageNumber: number;
  canvas: HTMLCanvasElement;
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ pageNumber, canvas }, ref) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current && canvas) {
      canvasRef.current.innerHTML = '';
      canvasRef.current.appendChild(canvas);
    }
  }, [canvas]);

  return (
    <div ref={ref} className="page bg-white shadow-lg">
      <div className="page-content h-full flex flex-col">
        <div ref={canvasRef} className="w-full h-full flex items-center justify-center" />
        <div className="page-footer text-center text-sm text-[#453142]/50 py-2">
          Page {pageNumber}
        </div>
      </div>
    </div>
  );
});

Page.displayName = 'Page';

export default function PDFFlipbook({ filename }: PDFFlipbookProps) {
  const flipbookRef = useRef<any>(null);
  const [pages, setPages] = useState<HTMLCanvasElement[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1.5);
  const [pdfjs, setPdfjs] = useState<any>(null);

  // Dynamically import pdfjs-dist on client
  useEffect(() => {
    const loadPDFJS = async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        setPdfjs(pdfjsLib);
      } catch (error) {
        console.error('Error loading PDF.js:', error);
      }
    };
    loadPDFJS();
  }, []);

  useEffect(() => {
    if (pdfjs) {
      loadPDF();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filename, pdfjs]);

  const loadPDF = async () => {
    if (!pdfjs) return;
    try {
      setLoading(true);
      const pdfUrl = `/pdfs/${filename}`;

      const loadingTask = pdfjs.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;

      setTotalPages(pdf.numPages);

      const pagePromises: Promise<HTMLCanvasElement>[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        pagePromises.push(renderPage(pdf, i, scale));
      }

      const renderedPages = await Promise.all(pagePromises);
      setPages(renderedPages);
      setLoading(false);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setLoading(false);
    }
  };

  const renderPage = async (
    pdf: any,
    pageNumber: number,
    scale: number
  ): Promise<HTMLCanvasElement> => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not get canvas context');
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    return canvas;
  };

  const nextPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipPrev();
    }
  };

  const onFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  // When zoom changes, re-render PDF
  const zoomIn = () => {
    setScale((prev) => {
      const newScale = Math.min(prev + 0.2, 3);
      return newScale;
    });
    setTimeout(() => loadPDF(), 100);
  };

  const zoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.2, 0.5);
      return newScale;
    });
    setTimeout(() => loadPDF(), 100);
  };

  if (!pdfjs || loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#453142] border-r-transparent mb-4"></div>
          <p className="text-[#453142]">
            {!pdfjs ? 'Loading PDF viewer...' : 'Loading PDF...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#453142]/5">
      {/* Controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 bg-white/95 rounded-full px-4 py-2 shadow-lg">
        <Button
          onClick={prevPage}
          disabled={currentPage === 0}
          variant="ghost"
          size="sm"
          className="rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="text-sm font-medium text-[#453142] min-w-[80px] text-center">
          {currentPage + 1} / {totalPages}
        </span>

        <Button
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          variant="ghost"
          size="sm"
          className="rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <div className="h-6 w-px bg-[#453142]/20" />

        <Button
          onClick={zoomOut}
          variant="ghost"
          size="sm"
          className="rounded-full"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>

        <Button
          onClick={zoomIn}
          variant="ghost"
          size="sm"
          className="rounded-full"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
      </div>

      {/* Flipbook */}
      <div className="flipbook-container">
        <HTMLFlipBook
          ref={flipbookRef}
          width={550}
          height={733}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="shadow-2xl"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages.map((canvas, index) => (
            <Page key={index} pageNumber={index + 1} canvas={canvas} />
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
}
