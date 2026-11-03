import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "motion/react";
import "./FlipCard.css";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * FlipCard — a 3D-flipping card component using the `motion` library.
 *
 * Props:
 *   flipped   {boolean}    — controlled flip state (true = show back face)
 *   axis      {"x" | "y"}  — rotation axis (default: "y")
 *   flipOnClick {boolean}  — if true, clicking the card toggles the flip (default: false)
 *   onFlip    {function}   — callback when the card is clicked (only if flipOnClick)
 *   front     {ReactNode}  — content for the front face
 *   back      {ReactNode}  — content for the back face
 *   className {string}     — optional additional class for the wrapper
 *   duration  {number}     — animation duration in seconds (default: 0.6)
 */
export default function FlipCard({
  flipped = false,
  axis = "y",
  flipOnClick = false,
  onFlip,
  front,
  back,
  className = "",
  duration = 0.6,
}) {
  const rotateProperty = axis === "x" ? "rotateX" : "rotateY";
  const [height, setHeight] = useState(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  // Dynamically sync and animate container height to the active face
  useIsomorphicLayoutEffect(() => {
    const updateHeight = () => {
      const activeEl = flipped ? backRef.current : frontRef.current;
      if (activeEl) {
        setHeight(activeEl.offsetHeight);
      }
    };

    updateHeight();

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        updateHeight();
      });
      if (frontRef.current) ro.observe(frontRef.current);
      if (backRef.current) ro.observe(backRef.current);
    }

    return () => {
      if (ro) ro.disconnect();
    };
  }, [flipped]);

  const handleClick = () => {
    if (flipOnClick && onFlip) {
      onFlip();
    }
  };

  return (
    <div
      className={`flip-card-perspective ${className}`}
      onClick={handleClick}
      style={{ cursor: flipOnClick ? "pointer" : "default" }}
    >
      <motion.div
        className="flip-card-inner"
        initial={false}
        animate={{
          [rotateProperty]: flipped ? 180 : 0,
          ...(height ? { height } : {}),
        }}
        transition={{
          duration,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        style={{
          height: height || undefined,
        }}
      >
        {/* Front face */}
        <div
          ref={frontRef}
          className={`flip-card-face flip-card-face--front ${
            !flipped && !height ? "relative" : "absolute top-0 left-0"
          } ${flipped ? "pointer-events-none" : "pointer-events-auto"}`}
        >
          {front}
        </div>

        {/* Back face */}
        <div
          ref={backRef}
          className={`flip-card-face flip-card-face--back ${
            flipped && !height ? "relative" : "absolute top-0 left-0"
          }`}
          style={{
            pointerEvents: flipped ? "auto" : "none",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
