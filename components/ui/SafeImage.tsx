"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "onError"> & {
  fallbackClassName?: string;
};

export default function SafeImage({
  fallbackClassName = "bg-gradient-to-br from-[#064E3B] to-[#021a14]",
  alt,
  className,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center ${fallbackClassName}`}
        role="img"
        aria-label={alt}
      >
        <p className="px-4 text-center text-xs uppercase tracking-[0.2em] text-white/40">
          Image: {alt}
        </p>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
