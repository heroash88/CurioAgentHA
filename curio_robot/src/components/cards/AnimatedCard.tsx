import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { Card } from '../../services/cardTypes';
import { X } from 'lucide-react';

interface AnimatedCardProps {
  card: Card;
  children: React.ReactNode;
  onDismiss: () => void;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
}

const SWIPE_DISMISS_THRESHOLD = 0.4;
const SPRING_BACK_MS = 200;
const ENTRANCE_MS = 300;
const EXIT_MS = 250;

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  card,
  children,
  onDismiss,
  onInteractionStart,
  onInteractionEnd,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [willChange, setWillChange] = useState(false);
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Swipe state
  const swipeStartX = useRef<number | null>(null);
  const [swipeX, setSwipeX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [springBack, setSpringBack] = useState(false);

  // Entrance animation
  useEffect(() => {
    if (card.animationState === 'entering') {
      setWillChange(true);
      // Force a frame so the initial transform is applied before transitioning
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEntered(true);
        });
      });
    }
  }, [card.animationState]);

  // Exit animation
  useEffect(() => {
    if (card.animationState === 'exiting') {
      setWillChange(true);
      setExiting(true);
    }
  }, [card.animationState]);

  const handleTransitionEnd = useCallback(() => {
    setWillChange(false);
  }, []);

  // Swipe handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      swipeStartX.current = e.clientX;
      setIsSwiping(false);
      setSpringBack(false);
      onInteractionStart();
    },
    [onInteractionStart],
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    setSwipeX(dx);
    setIsSwiping(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (swipeStartX.current === null) {
      onInteractionEnd();
      return;
    }
    const width = cardWidthRef.current;
    if (Math.abs(swipeX) > width * SWIPE_DISMISS_THRESHOLD) {
      onDismiss();
    } else {
      setSpringBack(true);
      setSwipeX(0);
      setTimeout(() => setSpringBack(false), SPRING_BACK_MS);
    }
    swipeStartX.current = null;
    setIsSwiping(false);
    onInteractionEnd();
  }, [swipeX, onDismiss, onInteractionEnd]);

  const handlePointerCancel = useCallback(() => {
    swipeStartX.current = null;
    setSwipeX(0);
    setIsSwiping(false);
    onInteractionEnd();
  }, [onInteractionEnd]);

  // Compute swipe opacity (proportional reduction) — use cached width to avoid layout thrash
  const cardWidthRef = useRef(300);
  if (cardRef.current && !isSwiping) {
    // Only measure when not actively swiping to avoid per-frame layout
    cardWidthRef.current = cardRef.current.offsetWidth || 300;
  }
  const swipeProgress = cardWidthRef.current > 0 ? Math.abs(swipeX) / cardWidthRef.current : 0;
  const swipeOpacity = Math.max(0, 1 - swipeProgress);

  // Build transform + opacity
  let transform: string;
  let opacity: number;
  let transition: string;

  if (exiting) {
    transform = 'translateY(100%)';
    opacity = 0;
    transition = `transform ${EXIT_MS}ms ease-in, opacity ${EXIT_MS}ms ease-in`;
  } else if (!entered) {
    transform = 'translateY(100%)';
    opacity = 0;
    transition = `transform ${ENTRANCE_MS}ms ease-out, opacity ${ENTRANCE_MS}ms ease-out`;
  } else if (isSwiping) {
    transform = `translateX(${swipeX}px)`;
    opacity = swipeOpacity;
    transition = 'none';
  } else if (springBack) {
    transform = 'translateX(0) translateY(0)';
    opacity = 1;
    transition = `transform ${SPRING_BACK_MS}ms ease-out, opacity ${SPRING_BACK_MS}ms ease-out`;
  } else {
    transform = 'translateY(0)';
    opacity = 1;
    transition = `transform ${ENTRANCE_MS}ms ease-out, opacity ${ENTRANCE_MS}ms ease-out`;
  }

  return (
    <div
      ref={cardRef}
      className="relative pointer-events-auto touch-pan-y"
      style={{
        transform,
        opacity,
        transition,
        willChange: willChange ? 'transform, opacity' : 'auto',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Close button */}
      <button
        className="absolute -top-2 -right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800/90 text-white/60 backdrop-blur-md transition-all hover:bg-slate-700 hover:text-white active:scale-90 border border-white/10 shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        aria-label="Dismiss card"
      >
        <X size={12} strokeWidth={3} />
      </button>
      {children}
    </div>
  );
};

export default React.memo(AnimatedCard);
