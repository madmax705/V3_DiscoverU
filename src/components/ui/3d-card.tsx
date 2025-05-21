"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setRotation({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className={cn("p-0", containerClassName)}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative transition-transform duration-200 ease-out",
          className,
        )}
        style={{
          transform: `rotateX(${-rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("[transform-style:preserve-3d]", className)}>
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateZ = 0,
}: {
  as?: any;
  children: React.ReactNode;
  className?: string;
  translateZ?: number;
}) => {
  return (
    <Tag
      className={cn(className)}
      style={{
        transform: `translateZ(${translateZ}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </Tag>
  );
};
