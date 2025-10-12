/** @format */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

export default function Carousel({ folder }) {
  const [items, setItems] = useState([]);
  // index of the currently centered item in items[]
  const [idx, setIdx] = useState(0);
  // animation state: -1 (animating right -> show prev), 0 idle, 1 (animating left -> show next)
  const [anim, setAnim] = useState(0);
  const timer = useRef(null);
  const animTimeout = useRef(null);
  const [disableTransition, setDisableTransition] = useState(false);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const [offsetPercent, setOffsetPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const leftHoverTimeoutRef = useRef(null);
  const rightHoverTimeoutRef = useRef(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/media?folder=${encodeURIComponent(folder)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        setItems(d.items || []);
        setIdx(0);
      })
      .catch(() => {
        if (!active) return;
        setItems([]);
      });
    return () => {
      active = false;
    };
  }, [folder]);

  // auto-advance
  useEffect(() => {
    if (!items.length) return;
    timer.current && clearInterval(timer.current);
    timer.current = setInterval(() => handleNext(), 4500);
    return () => timer.current && clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, idx]);

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
      clearTimeout(animTimeout.current);
      clearTimeout(leftHoverTimeoutRef.current);
      clearTimeout(rightHoverTimeoutRef.current);
    };
  }, []);

  const handlePrev = () => {
    if (anim !== 0) return; // ignore while animating
    setAnim(-1);
    // after animation completes, update idx and reset anim
    animTimeout.current && clearTimeout(animTimeout.current);
    animTimeout.current = setTimeout(() => {
      setIdx((i) => (i - 1 + items.length) % items.length);
      setAnim(0);
    }, 350); // must match CSS transition duration
  };

  const handleNext = () => {
    if (anim !== 0) return;
    setAnim(1);
    animTimeout.current && clearTimeout(animTimeout.current);
    animTimeout.current = setTimeout(() => {
      setIdx((i) => (i + 1) % items.length);
      setAnim(0);
    }, 350);
  };

  const jumpTo = (targetIdx) => {
    if (targetIdx === idx) return;
    // stop auto timer
    clearInterval(timer.current);
    // reset any drag offset and animation state, then snap to requested index
    setOffsetPercent(0);
    setAnim(0);
    setDisableTransition(true);
    setIdx(targetIdx);
    // re-enable transition on next tick
    setTimeout(() => setDisableTransition(false), 50);
  };

  // Pointer (drag/swipe) handlers
  const onPointerDown = (e) => {
    if (anim !== 0) return;
    if (items.length <= 1) return;
    // if the pointerdown started on a control (button), do not start dragging here
    try {
      const tgt = e.target;
      if (tgt && tgt.closest && tgt.closest("button")) return;
    } catch (err) {}
    isDraggingRef.current = true;
    setIsDragging(true);
    // Only reveal the arrow that is in proximity to the pointer start position
    try {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const w = rect.width || 1;
        // proximity zones: left 25%, right 25%
        if (x <= w * 0.25) {
          setShowLeftArrow(true);
          setShowRightArrow(false);
        } else if (x >= w * 0.75) {
          setShowLeftArrow(false);
          setShowRightArrow(true);
        } else {
          setShowLeftArrow(false);
          setShowRightArrow(false);
        }
      }
    } catch (err) {}
    startXRef.current = e.clientX;
    setDisableTransition(true);
    clearInterval(timer.current);
    // capture pointer so we keep receiving events
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch (err) {}
  };

  // Touch handlers (mirror pointer handlers but work reliably on some mobile browsers)
  const onTouchStart = (e) => {
    // single-finger touch only
    if (anim !== 0) return;
    if (items.length <= 1) return;
    const touch = e.touches && e.touches[0];
    if (!touch) return;
    // if the touch started on a control (button), do not start dragging here
    try {
      const tgt = e.target;
      if (tgt && tgt.closest && tgt.closest("button")) return;
    } catch (err) {}
    // mark that we are on a touch device so hover-only arrows don't show
    setIsTouchDevice(true);
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = touch.clientX;
    setDisableTransition(true);
    clearInterval(timer.current);
  };

  const onTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches && e.touches[0];
    if (!touch) return;
    const dx = touch.clientX - startXRef.current;
    const container = containerRef.current;
    if (!container) return;
    const containerWidth = container.clientWidth || 1;
    const percent = (dx / containerWidth) * 33.333333;
    setOffsetPercent(percent);
  };

  const onTouchEnd = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    const touch = (e.changedTouches && e.changedTouches[0]) || null;
    const endX = touch ? touch.clientX : startXRef.current;
    const dx = endX - startXRef.current;
    const container = containerRef.current;
    if (!container) {
      setOffsetPercent(0);
      setDisableTransition(false);
      return;
    }
    const thresholdPx = container.clientWidth * 0.2;
    setDisableTransition(false);
    if (dx <= -thresholdPx) {
      setOffsetPercent(0);
      handleNext();
    } else if (dx >= thresholdPx) {
      setOffsetPercent(0);
      handlePrev();
    } else {
      setOffsetPercent(0);
    }
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    const container = containerRef.current;
    if (!container) return;
    const containerWidth = container.clientWidth || 1;
    // convert pixel dx to percent of TRACK width (track is 300% of container)
    const percent = (dx / containerWidth) * 33.333333;
    setOffsetPercent(percent);
  };

  const endDrag = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch (err) {}
    const dx = e.clientX - startXRef.current;
    const container = containerRef.current;
    if (!container) {
      setOffsetPercent(0);
      setDisableTransition(false);
      return;
    }
    const thresholdPx = container.clientWidth * 0.2; // 20% swipe threshold
    setDisableTransition(false);
    if (dx <= -thresholdPx) {
      // swipe left -> next
      setOffsetPercent(0);
      handleNext();
    } else if (dx >= thresholdPx) {
      // swipe right -> prev
      setOffsetPercent(0);
      handlePrev();
    } else {
      // not far enough -> snap back
      setOffsetPercent(0);
      // anim stays 0 so transform will animate back to center
    }
  };

  if (!items.length) return <div className="skeleton h-64 rounded-xl" />;

  // utility to pick safely when items < 3
  const pick = (offset) => {
    if (!items.length) return null;
    if (items.length === 1) return items[0];
    const i = (idx + offset + items.length) % items.length;
    return items[i];
  };

  const left = pick(-1);
  const center = pick(0);
  const right = pick(1);

  // slide positions (percent relative to track width):
  // left panel visible -> 0%
  // center panel visible -> -33.3333%
  // right panel visible -> -66.6666%
  const CENTER = -33.333333;
  const LEFT_POS = 0;
  const RIGHT_POS = -66.666666;
  // combine base translate (LEFT/CENTER/RIGHT) with temporary drag offset
  const baseTranslate = anim === 0 ? CENTER : anim === 1 ? RIGHT_POS : LEFT_POS;
  const translatePercent = baseTranslate + offsetPercent;

  return (
    <div className="relative size-full group overflow-hidden">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        className={`relative size-full`}
        style={{
          touchAction: "pan-y",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <div
          className="absolute left-0 top-0 h-full flex"
          style={{
            width: "300%",
            transform: `translateX(${translatePercent}%)`,
            transition: disableTransition
              ? "none"
              : anim === 0
              ? "none"
              : "transform 350ms ease-in-out",
          }}
        >
          {/* left */}
          <div className="w-1/3 h-full flex-shrink-0 relative">
            {left ? (
              <img
                src={left.url}
                alt={left.name}
                className={`w-full h-full object-cover`}
                onDragStart={(e) => e.preventDefault()}
              />
            ) : (
              <div className="skeleton h-full w-full" />
            )}
          </div>

          {/* center */}
          <div className="w-1/3 h-full flex-shrink-0 relative">
            {center ? (
              <img
                src={center.url}
                alt={center.name}
                className={`w-full h-full object-cover`}
                onDragStart={(e) => e.preventDefault()}
              />
            ) : (
              <div className="skeleton h-full w-full" />
            )}
            {/* {center.description ? (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-sm hidden md:block">
                {center.description}
              </div>
            ) : null} */}
          </div>

          {/* right */}
          <div className="w-1/3 h-full flex-shrink-0 relative">
            {right ? (
              <img
                src={right.url}
                alt={right.name}
                className={`w-full h-full object-cover`}
                onDragStart={(e) => e.preventDefault()}
              />
            ) : (
              <div className="skeleton h-full w-full" />
            )}
          </div>
        </div>

        {/* gradient and overlay */}
        {/* <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--bg) 60%, transparent), transparent)",
            }}
          />
        </div> */}

        {/* left/right hover zones (invisible) that reveal arrows when pointer is near */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 bottom-0 rounded-r-full"
          style={{ width: "25%", height: "50%" }}
          onPointerEnter={() => {
            clearTimeout(leftHoverTimeoutRef.current);
            setShowLeftArrow(true);
          }}
          onPointerLeave={() => {
            clearTimeout(leftHoverTimeoutRef.current);
            leftHoverTimeoutRef.current = setTimeout(
              () => setShowLeftArrow(false),
              100
            );
          }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 bottom-0 rounded-l-full"
          style={{ width: "25%", height: "50%" }}
          onPointerEnter={() => {
            clearTimeout(rightHoverTimeoutRef.current);
            setShowRightArrow(true);
          }}
          onPointerLeave={() => {
            clearTimeout(rightHoverTimeoutRef.current);
            rightHoverTimeoutRef.current = setTimeout(
              () => setShowRightArrow(false),
              100
            );
          }}
        />

        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <button
            // button is hidden by default; becomes visible when pointer is near left zone
            onPointerEnter={() => {
              clearTimeout(leftHoverTimeoutRef.current);
              setShowLeftArrow(true);
            }}
            onPointerLeave={() => {
              clearTimeout(leftHoverTimeoutRef.current);
              leftHoverTimeoutRef.current = setTimeout(
                () => setShowLeftArrow(false),
                100
              );
            }}
            style={{
              opacity: isTouchDevice ? 0 : showLeftArrow || isDragging ? 1 : 0,
              transition: "opacity 180ms ease-in-out",
            }}
            className={`${
              isTouchDevice
                ? "pointer-events-none"
                : showLeftArrow || isDragging
                ? "pointer-events-auto cursor-pointer"
                : "pointer-events-none"
            } bg-white text-black shadow-md text-2xl md:size-10 flex justify-center items-center rounded-full`}
            onClick={() => {
              clearInterval(timer.current);
              handlePrev();
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          <button
            onPointerEnter={() => {
              clearTimeout(rightHoverTimeoutRef.current);
              setShowRightArrow(true);
            }}
            onPointerLeave={() => {
              clearTimeout(rightHoverTimeoutRef.current);
              rightHoverTimeoutRef.current = setTimeout(
                () => setShowRightArrow(false),
                100
              );
            }}
            style={{
              opacity: isTouchDevice ? 0 : showRightArrow || isDragging ? 1 : 0,
              transition: "opacity 180ms ease-in-out",
            }}
            className={`${
              isTouchDevice
                ? "pointer-events-none"
                : showRightArrow || isDragging
                ? "pointer-events-auto cursor-pointer"
                : "pointer-events-none"
            } bg-white text-black shadow-md text-2xl md:size-10 flex justify-center items-center rounded-full`}
            onClick={() => {
              clearInterval(timer.current);
              handleNext();
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
        {/* dots indicator */}
        <div className="absolute left-0 right-0 bottom-3 flex justify-center pointer-events-auto">
          <div className="flex gap-4 bg-transparent p-1">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => jumpTo(i)}
                onPointerDown={(e) => {
                  // prevent the pointerdown from starting a drag on the track
                  e.stopPropagation();
                }}
                onTouchStart={(e) => {
                  // stop drag start and let the click/touch trigger jumpTo
                  e.stopPropagation();
                }}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === idx ? "true" : "false"}
                className={`transition-colors flex items-center justify-center ${
                  i === idx
                    ? "w-3 h-3 md:w-4 md:h-4 rounded-full bg-white ring-2 ring-white"
                    : "w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/40"
                } cursor-pointer`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
