import { useEffect, useState } from "react";

/**
 * Uses the Web Share API when available; falls back to copying the
 * invitation text to the clipboard. No backend involved either way.
 */
export default function ShareButton({ label, title, text, url }) {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(""), 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

  async function handleShare() {
    const shareData = { title, text, ...(url ? { url } : {}) };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err?.name !== "AbortError") {
          setFeedback("Couldn't share — copy it instead?");
        }
      }
      return;
    }

    const fallbackText = url ? `${text} ${url}` : text;
    try {
      await navigator.clipboard.writeText(fallbackText);
      setFeedback("Copied to clipboard! 📋");
    } catch {
      setFeedback("Couldn't copy automatically — select and copy the text yourself.");
    }
  }

  return (
    <div>
      <button type="button" className="btn btn-share" onClick={handleShare}>
        {label}
      </button>
      {feedback && (
        <p className="share-feedback" role="status">
          {feedback}
        </p>
      )}
    </div>
  );
}
