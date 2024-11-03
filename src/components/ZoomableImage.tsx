'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ZoomableImageProps {
  src: string;
  alt: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt }) => {
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 0.5));
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <p className="text-red-500">Failed to load image</p>
        </div>
      )}

      <div className="relative overflow-auto max-h-[70vh] max-w-[90vw]">
        <div style={{ transform: `scale(${scale})`, transition: 'transform 200ms' }}>
          <Image
            src={src}
            alt={alt}
            width={800}
            height={600}
            className="w-full h-auto"
            onLoadingComplete={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setError(true);
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          disabled={scale <= 0.5}
          className="h-8 w-8 rounded-full bg-white/90 shadow-lg hover:bg-white/100"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          disabled={scale >= 3}
          className="h-8 w-8 rounded-full bg-white/90 shadow-lg hover:bg-white/100"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ZoomableImage;