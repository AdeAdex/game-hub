'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const [delayedVisible, setDelayedVisible] = useState(false);

  // const updatePosition = () => {
  //   if (tooltipEl && targetRef.current) {
  //     const targetRect = targetRef.current.getBoundingClientRect();
  //     const scrollY = window.scrollY || window.pageYOffset;
  //     const scrollX = window.scrollX || window.pageXOffset;
  //     const viewportWidth = window.innerWidth;

  //     let leftPosition = targetRect.right + scrollX + 10;
  //     // Check if tooltip overflows the right edge of the screen
  //     if (leftPosition + tooltipEl.offsetWidth > viewportWidth) {
  //       leftPosition = targetRect.left + scrollX - tooltipEl.offsetWidth - 10;
  //     }

  //     tooltipEl.style.top = `${targetRect.top + scrollY - 10}px`;
  //     tooltipEl.style.left = `${leftPosition}px`;
  //   }
  // };


  const updatePosition = useCallback(() => {
    if (tooltipEl && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      const viewportWidth = window.innerWidth;

      let leftPosition = targetRect.right + scrollX + 10;
      if (leftPosition + tooltipEl.offsetWidth > viewportWidth) {
        leftPosition = targetRect.left + scrollX - tooltipEl.offsetWidth - 10;
      }

      tooltipEl.style.top = `${targetRect.top + scrollY - 10}px`;
      tooltipEl.style.left = `${leftPosition}px`;
    }
  }, [tooltipEl, targetRef]);


  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (visible) {
      timeout = setTimeout(() => {
        setDelayedVisible(true);
      }, 1500);
    } else {
      setDelayedVisible(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  useEffect(() => {
    if (delayedVisible && tooltipEl && targetRef.current) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [delayedVisible, tooltipEl, targetRef, updatePosition]);

  if (!delayedVisible) return null;

  return createPortal(
    <div
      ref={setTooltipEl}
      className="absolute bg-white shadow-lg rounded p-2 z-50 transition-opacity duration-200"
      style={{ opacity: delayedVisible ? 1 : 0 }}
    >
      {content}
    </div>,
    document.body
  );
};

export default CustomTooltip;
