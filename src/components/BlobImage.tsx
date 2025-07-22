import React from "react";

interface BlobImageProps {
  /** Path or URL of the real image you want to show */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional explicit size (falls back to 640×480) */
  width?: number;
  height?: number;
}

const BlobImage: React.FC<BlobImageProps> = ({
  src,
  alt,
  width = 640,
  height = 480,
}) => {
  return (
    <div
      className="relative inline-block text-orange-500" // <- blob colour
      style={{ width, height }}
    >
      {/* Decorative blob behind the photo */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -inset-3 -z-10 rotate-6"
        preserveAspectRatio="none"
      >
        {/* free-hand, slightly "wonky" hexagon-ish blob */}
        <path
          d="
            M40 10
            Q80 0 130 12
            Q185 40 190 100
            Q190 160 130 188
            Q80 200 40 188
            Q10 160 10 100
            Q10 40 40 10
            Z
          "
          fill="currentColor"
        />
      </svg>

      {/* Real picture */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full rounded-lg object-cover shadow-lg"
      />
    </div>
  );
};

export default BlobImage;
