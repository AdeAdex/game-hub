import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface CustomTooltipProps {
  content: React.ReactNode;
  targetRef: React.RefObject<HTMLElement>;
  visible: boolean;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  content,
  targetRef,
  visible,
}) => {
  const [tooltipEl, setTooltipEl] = useState<HTMLDivElement | null>(null);

  const updatePosition = () => {
    if (tooltipEl && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;

      tooltipEl.style.top = `${targetRect.top + scrollY - 10}px`; // Adjust for vertical scroll
      tooltipEl.style.left = `${targetRect.right + scrollX + 10}px`; // Position to the right of the card
    }
  };

  useEffect(() => {
    if (visible && tooltipEl && targetRef.current) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [visible, tooltipEl, targetRef]);

  if (!visible) return null;

  return createPortal(
    <div
      ref={setTooltipEl}
      className="absolute bg-white shadow-lg rounded p-2 z-50 transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {content}
    </div>,
    document.body
  );
};

export default CustomTooltip;
