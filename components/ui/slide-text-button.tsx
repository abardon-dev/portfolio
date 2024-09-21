"use client";

import { useState, useEffect, useRef, createRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";

interface SlideTextButtonProps extends ButtonProps {
  labels: string[];
}

const SlideTextButton = forwardRef<HTMLButtonElement, SlideTextButtonProps>(({ labels, ...props }, ref) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const labelRefs = useRef(labels.map(() => createRef<HTMLSpanElement>()));

  const [isPaused, setIsPaused] = useState(false);
  const [currentLabelIndex, setCurrentLabelIndex] = useState<number>(0);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setCurrentLabelIndex((prevIndex) => (prevIndex + 1) % labels.length);
      }, 1000);
    };

    if (!isPaused) {
      startInterval();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, labels.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <Button
      {...props}
      ref={ref}
      className="relative min-w-32 overflow-hidden transition-all duration-300 ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentLabelIndex}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
        >
          {labels[currentLabelIndex]}
        </motion.span>
      </AnimatePresence>
      {labels.map((label, index) => (
        <span
          key={index}
          ref={labelRefs.current[index]}
          className="pointer-events-none absolute opacity-0"
          aria-hidden="true"
        >
          {label}
        </span>
      ))}
    </Button>
  );
});

SlideTextButton.displayName = "SlideTextButton";

export { SlideTextButton };
