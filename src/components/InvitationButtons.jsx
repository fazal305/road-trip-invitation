import { useRef } from "react";
import { useRunawayButton } from "../hooks/useRunawayButton";

/**
 * YES / NO button row. YES is always easy to hit. NO uses
 * `useRunawayButton` to dodge the pointer — see that hook for the movement
 * logic, kept fully separate from this presentation component.
 *
 * `avoidRefs` lets the parent pass extra elements (e.g. the invitation text
 * block) that the NO button should never land on top of.
 */
export default function InvitationButtons({ data, onYes, avoidRefs = [] }) {
  const yesButtonRef = useRef(null);

  const { buttonRef, position, isRunaway, attemptCount, label, handlers } =
    useRunawayButton({
      labels: data.noLabels,
      avoidRefs: [yesButtonRef, ...avoidRefs],
    });

  const noStyle = position
    ? { transform: `translate(${position.x}px, ${position.y}px)` }
    : undefined;

  return (
    <div className="button-row">
      <button
        type="button"
        ref={yesButtonRef}
        className="btn btn-yes"
        onClick={onYes}
      >
        {data.yesLabel}
      </button>

      {isRunaway && <span className="btn-no-placeholder" aria-hidden="true" />}

      <button
        type="button"
        ref={buttonRef}
        className={`btn btn-no${isRunaway ? " is-runaway" : ""}`}
        data-attempt-count={attemptCount}
        {...handlers}
      >
        {label}
      </button>
    </div>
  );
}
