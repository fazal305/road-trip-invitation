import { useCallback, useEffect, useRef, useState } from "react";
import { getRandomSafePosition } from "../utils/randomPosition";

const PROXIMITY_THRESHOLD = 100; // px — pointer distance that triggers a dodge
const ESCAPE_COOLDOWN_MS = 260; // avoid re-triggering mid-transition

/**
 * Encapsulates the "runaway NO button" behavior:
 * - detects an approaching/incoming pointer (mouse hover proximity, or a
 *   touch/pen press) and relocates the button before the click can land
 * - keeps the button fully inside the viewport
 * - avoids overlapping other on-screen elements (via `avoidRefs`)
 * - tracks how many times the user has attempted to interact with it
 * - exposes the current label from `labels`, capped at the last entry
 *
 * Keyboard users are never trapped: Enter/Space on the focused button still
 * triggers the same dodge (consistent with the joke), and the always-easy
 * YES button remains the way to complete the flow.
 */
export function useRunawayButton({ labels, avoidRefs = [] }) {
  const buttonRef = useRef(null);
  const pointerPosRef = useRef(null);
  const lastEscapeRef = useRef(0);
  const positionRef = useRef(null);

  const [position, setPosition] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const escape = useCallback(
    (pointerPosition) => {
      const button = buttonRef.current;
      if (!button) return;

      const now = Date.now();
      if (now - lastEscapeRef.current < ESCAPE_COOLDOWN_MS) return;
      lastEscapeRef.current = now;

      const rect = button.getBoundingClientRect();
      const avoidRects = avoidRefs
        .map((ref) => ref.current?.getBoundingClientRect())
        .filter(Boolean);

      const nextPosition = getRandomSafePosition({
        width: rect.width,
        height: rect.height,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        avoidRects,
        previousPosition: positionRef.current,
        pointerPosition,
      });

      setPosition(nextPosition);
      setAttemptCount((count) => count + 1);
    },
    [avoidRefs],
  );

  // Desktop: dodge as soon as the mouse gets close, before it can click.
  useEffect(() => {
    function handlePointerMove(event) {
      if (event.pointerType && event.pointerType !== "mouse") return;

      pointerPosRef.current = { x: event.clientX, y: event.clientY };

      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < PROXIMITY_THRESHOLD) {
        escape({ x: event.clientX, y: event.clientY });
      }
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [escape]);

  // Keep the button on-screen if the viewport is resized (rotation, etc.)
  useEffect(() => {
    function handleResize() {
      const button = buttonRef.current;
      if (!button || !positionRef.current) return;

      const rect = button.getBoundingClientRect();
      const padding = 16;
      const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
      const maxY = Math.max(
        padding,
        window.innerHeight - rect.height - padding,
      );

      setPosition((prev) =>
        prev
          ? {
              x: Math.min(Math.max(prev.x, padding), maxX),
              y: Math.min(Math.max(prev.y, padding), maxY),
            }
          : prev,
      );
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch/pen (and a safety net for anything mousemove missed): dodge the
  // instant a press starts, so by the time the finger lifts the button is
  // no longer underneath it and no click fires.
  const handlePointerDown = useCallback(
    (event) => {
      escape({ x: event.clientX, y: event.clientY });
    },
    [escape],
  );

  // Keyboard activation (Enter/Space) fires a click with no pointer
  // coordinates — still dodge, so keyboard users get the same joke instead
  // of a button that silently ignores them.
  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      escape(pointerPosRef.current);
    },
    [escape],
  );

  const label = labels[Math.min(attemptCount, labels.length - 1)];
  const isRunaway = position !== null;

  return {
    buttonRef,
    position,
    isRunaway,
    attemptCount,
    label,
    handlers: {
      onPointerDown: handlePointerDown,
      onClick: handleClick,
    },
  };
}
