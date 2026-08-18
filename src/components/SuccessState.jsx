import { useMemo } from "react";
import ShareButton from "./ShareButton";

const CONFETTI_EMOJI = ["🎉", "🚗", "✨", "🎊", "🧡"];
const CONFETTI_COUNT = 24;

function useConfettiPieces() {
  return useMemo(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 2.2 + Math.random() * 1.4,
        emoji: CONFETTI_EMOJI[Math.floor(Math.random() * CONFETTI_EMOJI.length)],
      })),
    []
  );
}

/**
 * Shown after the user accepts. A lightweight, CSS-driven confetti burst
 * (no animation library) plus the trip details and a share action.
 * `data` is the (possibly user-edited) invitation config.
 */
export default function SuccessState({ data }) {
  const pieces = useConfettiPieces();

  return (
    <div className="success-state">
      <div className="confetti-layer" aria-hidden="true">
        {pieces.map((piece) => (
          <span
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.left}%`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
            }}
          >
            {piece.emoji}
          </span>
        ))}
      </div>

      <div className="success-emoji" aria-hidden="true">
        {data.successEmojiHeader}
      </div>
      <h1 className="success-title">{data.successTitle}</h1>
      <p className="success-message">{data.successMessage}</p>

      <div className="success-details">
        <div className="success-detail-row">
          <span className="success-detail-icon" aria-hidden="true">
            📍
          </span>
          <span>{data.destination}</span>
        </div>
        <div className="success-detail-row">
          <span className="success-detail-icon" aria-hidden="true">
            📅
          </span>
          <span>{data.date}</span>
        </div>
        <div className="success-detail-row">
          <span className="success-detail-icon" aria-hidden="true">
            ⏰
          </span>
          <span>{data.time}</span>
        </div>
      </div>

      <p className="success-footer">{data.successFooter}</p>

      <ShareButton
        label={data.shareLabel}
        title={data.shareTitle}
        text={data.shareText}
      />
    </div>
  );
}
