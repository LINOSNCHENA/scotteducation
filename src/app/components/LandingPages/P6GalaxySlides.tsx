"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { photoData } from "@/app/utils/Slides";

// Custom hook for handling swipe gestures
const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaX > 50) onSwipeRight();
    if (deltaX < -50) onSwipeLeft();

    touchStartX.current = null;
  };

  return { handleTouchStart, handleTouchEnd };
};

const S7PhotoMontage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImageId, setModalImageId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Memoize current photos to prevent unnecessary re-renders
  const currentPhotos = useMemo(() => {
    return isMobile ? [photoData[currentIndex]] : [photoData[currentIndex], photoData[(currentIndex + 1) % photoData.length]];
  }, [currentIndex, isMobile]);

  // Memoize resetInterval
  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + (isMobile ? 1 : 2)) % photoData.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMobile]);

  // Memoize handleNavigation
  const handleNavigation = useCallback(
    (direction: "left" | "right") => {
      if (modalImageId !== null) {
        // Handle modal navigation
        const currentModalIndex = photoData.findIndex((p) => p.id === modalImageId);
        let newModalIndex: number;
        if (direction === "left") {
          newModalIndex = (currentModalIndex - 1 + photoData.length) % photoData.length;
        } else {
          newModalIndex = (currentModalIndex + 1) % photoData.length;
        }
        setModalImageId(photoData[newModalIndex].id);
      } else {
        // Handle carousel navigation
        const step = isMobile ? 1 : 2;
        setCurrentIndex((prev) => (direction === "left" ? (prev - step + photoData.length) % photoData.length : (prev + step) % photoData.length));
      }
      resetInterval();
    },
    [isMobile, modalImageId, resetInterval]
  );

  // Swipe gesture handlers
  const { handleTouchStart, handleTouchEnd } = useSwipe(
    () => handleNavigation("left"),
    () => handleNavigation("right")
  );

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation and focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalImageId) {
        if (e.key === "Escape") setModalImageId(null);
        if (e.key === "ArrowLeft") handleNavigation("left");
        if (e.key === "ArrowRight") handleNavigation("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    if (modalImageId && modalRef.current) {
      modalRef.current.focus();
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalImageId, handleNavigation]);

  // Auto-slide effect
  useEffect(() => {
    if (!modalImageId) {
      resetInterval();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [modalImageId, resetInterval]);

  return (
    <section className="w-full bg-gray-900 overflow-x-hidden min-w-screen">
      <div className="w-full p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg bg-white">
        <div className="flex items-center justify-center gap-6 w-full py-4" ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button
            onClick={() => handleNavigation("left")}
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-label="Previous images"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex flex-1 justify-center items-center gap-6 flex-col sm:flex-row rounded-xl p-6 bg-gray-900 h-full shadow-inner">
            {currentPhotos.map((photo) => (
              <div key={photo.id} className="flex flex-col w-full sm:w-[45%]">
                <div
                  className="relative h-[400px] cursor-pointer group bg-white rounded-lg shadow-md overflow-hidden"
                  onClick={() => setModalImageId(photo.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${photo.title} in full screen`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setModalImageId(photo.id);
                    }
                  }}
                >
                  <Image
                    src={photo.path}
                    alt={photo.title}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 90vw, 45vw"
                    priority={currentIndex <= 1}
                    loading={currentIndex > 1 ? "lazy" : "eager"}
                    onError={() => console.error(`Failed to load image: ${photo.path}`)}
                  />
                </div>
                <div className="bg-white bg-opacity-80 text-gray-800 p-3 text-center rounded-b-lg font-medium">{photo.title}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleNavigation("right")}
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-label="Next images"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {modalImageId && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center z-50 p-6"
            ref={modalRef}
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Escape") setModalImageId(null);
            }}
          >
            {/* Top Control Bar */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-black bg-opacity-70">
              <div className="text-white text-lg font-semibold">{photoData.find((p) => p.id === modalImageId)?.title}</div>
              <div className="flex gap-4">
                <button
                  onClick={() => setModalImageId(null)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors flex items-center gap-2"
                  aria-label="Exit full screen mode"
                >
                  <X className="w-5 h-5" />
                  <span>Exit</span>
                </button>
              </div>
            </div>

            {/* Main Image Content */}
            <div className="relative w-full h-full max-w-7xl max-h-[80vh] mx-8 mt-16 mb-24">
              <Image
                src={photoData.find((p) => p.id === modalImageId)?.path || ""}
                alt={photoData.find((p) => p.id === modalImageId)?.title || "Expanded view"}
                fill
                className="object-contain rounded-lg"
                priority
                onError={() => console.error(`Failed to load modal image: ${modalImageId}`)}
                onLoad={() => console.log(`Successfully loaded modal image: ${modalImageId}`)}
              />

              <button
                onClick={() => setModalImageId(null)}
                className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors flex items-center gap-2"
                aria-label="Exit full screen mode"
              >
                <X className="w-5 h-5" />
                <span>Exit</span>
              </button>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation("left");
                }}
                className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation("right");
                }}
                className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-12 left-0 right-0 text-center text-white text-sm font-medium">
              {`${photoData.findIndex((p) => p.id === modalImageId) + 1} / ${photoData.length}`}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default S7PhotoMontage;
