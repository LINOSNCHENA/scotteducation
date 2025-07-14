"use client";

import React from "react";
import Image from "next/image";
import { COMP_ICON_LOGO } from "@/app/utils/Branding/ApiRoutes";

interface WatermarkBackgroundProps {
  altText?: string;
  opacity?: number;
  rotateDeg?: number;
}

export default function WatermarkBackground({ altText = "Background Watermark", opacity = 0.1, rotateDeg = 0 }: WatermarkBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden p-2 m-2 top-40 right-50">
      <div className="relative w-full h-64 sm:h-96 md:h-[32rem] lg:h-[40rem]">
        <Image
          src={COMP_ICON_LOGO}
          alt={altText}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
          className="object-contain"
          style={{
            opacity,
            transform: `rotate(${rotateDeg}deg)`,
            filter: "grayscale(50%) brightness(0.9)",
          }}
          quality={70}
          priority={true}
        />
      </div>
    </div>
  );
}
