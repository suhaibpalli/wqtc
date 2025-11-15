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
  const [scale, setScale] = useState(3); // double the scale from 1.5 to 3
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
  }, [filename, pdfjs, scale]); // include scale so changing zoom reloads pages

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

  // Group pages into spreads (arrays of [left, right])
  const getSpreads = (pagesArr: HTMLCanvasElement[]) => {
    const spreads: Array<[HTMLCanvasElement | null, HTMLCanvasElement | null]> = [];
    // For cover mode: first page is alone (right side)
    if (pagesArr.length === 0) return spreads;
    spreads.push([null, pagesArr[0]]); // Cover: left empty, right is first
    for (let i = 1; i < pagesArr.length; i += 2) {
      spreads.push([
        pagesArr[i] || null,
        pagesArr[i + 1] || null,
      ]);
    }
    return spreads;
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
      const newScale = Math.min(prev + 0.4, 6); // slightly larger increments
      return newScale;
    });
  };

  const zoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.4, 1);
      return newScale;
    });
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

  // DOUBLE the page width and height
  // The original was width={550}, height={733} (single), now make width={1100}, height={1466} (for spread)
  // If you want to let scale also affect the size, adjust here as needed.

  // For shadow effect and clarity max width/height also doubled
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
          {currentPage + 1} / {getSpreads(pages).length}
        </span>

        <Button
          onClick={nextPage}
          disabled={currentPage >= getSpreads(pages).length - 1}
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
          width={1100}
          height={1466}
          size="stretch"
          minWidth={630}
          maxWidth={2000}
          minHeight={800}
          maxHeight={3066}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="shadow-2xl"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={false} // changed to horizontal spreads
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* Map spreads: first is cover (single page right), then double pages per spread */}
          {getSpreads(pages).map((spread, spreadIdx) => {
            // Spread: [leftPageCanvas, rightPageCanvas]
            return (
              <div key={spreadIdx} className="flex w-full h-full">
                {/* Left page */}
                <div className="flex-1 flex">
                  {spread[0] ? (
                    <Page pageNumber={spreadIdx === 0 ? 1 : spreadIdx * 2} canvas={spread[0]} />
                  ) : (
                    // Empty for cover and last right page
                    <div className="page bg-white shadow-lg flex-1" />
                  )}
                </div>
                {/* Right page */}
                <div className="flex-1 flex">
                  {spread[1] ? (
                    <Page
                      pageNumber={
                        spreadIdx === 0
                          ? 1
                          : spread[0]
                            ? spreadIdx * 2 + 1
                            : spreadIdx * 2
                      }
                      canvas={spread[1]}
                    />
                  ) : (
                    <div className="page bg-white shadow-lg flex-1" />
                  )}
                </div>
              </div>
            );
          })}
        </HTMLFlipBook>
      </div>
    </div>
  );
}
