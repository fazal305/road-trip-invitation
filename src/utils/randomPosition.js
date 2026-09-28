// Utilities for picking a new on-screen position for the "runaway" NO button.
// Pure functions — no DOM access here so they stay easy to reason about/test.

const DEFAULT_PADDING = 16;
const DEFAULT_MIN_DISTANCE_FROM_PREVIOUS = 110;
const DEFAULT_MIN_DISTANCE_FROM_POINTER = 130;
const DEFAULT_MAX_TRIES = 30;
const AVOID_RECT_MARGIN = 12;

function distance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

function rectsOverlap(a, b, margin = 0) {
  return !(
    a.right + margin < b.left ||
    a.left - margin > b.right ||
    a.bottom + margin < b.top ||
    a.top - margin > b.bottom
  );
}

function candidateRect(x, y, width, height) {
  return { left: x, top: y, right: x + width, bottom: y + height };
}

/**
 * Picks a random position for a `width` x `height` box that stays fully
 * inside the viewport (minus padding), avoids overlapping `avoidRects`,
 * keeps some distance from `previousPosition`, and avoids appearing right
 * under `pointerPosition`.
 *
 * Falls back gracefully: if no candidate satisfies every constraint within
 * `maxTries`, constraints are relaxed (pointer distance first, then avoid
 * rects, then previous-position distance) so a valid in-viewport position
 * is always returned.
 */
export function getRandomSafePosition({
  width,
  height,
  viewport,
  avoidRects = [],
  previousPosition = null,
  pointerPosition = null,
  padding = DEFAULT_PADDING,
  minDistanceFromPrevious = DEFAULT_MIN_DISTANCE_FROM_PREVIOUS,
  minDistanceFromPointer = DEFAULT_MIN_DISTANCE_FROM_POINTER,
  maxTries = DEFAULT_MAX_TRIES,
}) {
  const minX = padding;
  const minY = padding;
  const maxX = Math.max(minX, viewport.width - width - padding);
  const maxY = Math.max(minY, viewport.height - height - padding);

  const randomCandidate = () => ({
    x: minX + Math.random() * (maxX - minX),
    y: minY + Math.random() * (maxY - minY),
  });

  const satisfies = (pos, { checkPointer, checkAvoid, checkPrevious }) => {
    const cx = pos.x + width / 2;
    const cy = pos.y + height / 2;

    if (checkPrevious && previousPosition) {
      const pcx = previousPosition.x + width / 2;
      const pcy = previousPosition.y + height / 2;
      if (distance(cx, cy, pcx, pcy) < minDistanceFromPrevious) return false;
    }

    if (checkPointer && pointerPosition) {
      if (
        distance(cx, cy, pointerPosition.x, pointerPosition.y) <
        minDistanceFromPointer
      ) {
        return false;
      }
    }

    if (checkAvoid && avoidRects.length > 0) {
      const rect = candidateRect(pos.x, pos.y, width, height);
      for (const avoid of avoidRects) {
        if (rectsOverlap(rect, avoid, AVOID_RECT_MARGIN)) return false;
      }
    }

    return true;
  };

  // Try with all constraints, then progressively relax if nothing is found.
  const constraintLevels = [
    { checkPointer: true, checkAvoid: true, checkPrevious: true },
    { checkPointer: false, checkAvoid: true, checkPrevious: true },
    { checkPointer: false, checkAvoid: true, checkPrevious: false },
    { checkPointer: false, checkAvoid: false, checkPrevious: false },
  ];

  for (const level of constraintLevels) {
    for (let i = 0; i < maxTries; i++) {
      const candidate = randomCandidate();
      if (satisfies(candidate, level)) return candidate;
    }
  }

  // Should be unreachable (last level has no constraints), but guarantees
  // a safe in-viewport fallback no matter what.
  return randomCandidate();
}
