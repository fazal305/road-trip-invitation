import { useEffect, useRef } from "react";

/**
 * Slide-in panel for editing invitation content and toggling the theme,
 * entirely client-side (persisted to localStorage by the parent's hooks —
 * see useInvitationData / useTheme). No backend involved.
 */
export default function SettingsPanel({
  data,
  onChange,
  onReset,
  theme,
  onToggleTheme,
  onClose,
}) {
  const firstFieldRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleField(field) {
    return (event) => onChange({ [field]: event.target.value });
  }

  function handleNoLabels(event) {
    const labels = event.target.value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    onChange({ noLabels: labels });
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <div
      className="settings-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Invitation settings"
        ref={panelRef}
      >
        <div className="settings-header">
          <h2 className="settings-title">Settings</h2>
          <button
            type="button"
            className="settings-close"
            onClick={onClose}
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div className="settings-body">
          <section className="settings-section">
            <h3 className="settings-section-title">Appearance</h3>
            <div className="theme-toggle-row">
              <span>Theme</span>
              <button
                type="button"
                className="theme-toggle"
                onClick={onToggleTheme}
                aria-pressed={theme === "light"}
              >
                {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
              </button>
            </div>
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Trip details</h3>

            <label className="settings-field">
              <span>From</span>
              <input
                ref={firstFieldRef}
                type="text"
                value={data.origin}
                onChange={handleField("origin")}
              />
            </label>

            <label className="settings-field">
              <span>To</span>
              <input
                type="text"
                value={data.destination}
                onChange={handleField("destination")}
              />
            </label>

            <label className="settings-field">
              <span>Date</span>
              <input
                type="text"
                value={data.date}
                onChange={handleField("date")}
              />
            </label>

            <label className="settings-field">
              <span>Time</span>
              <input
                type="text"
                value={data.time}
                onChange={handleField("time")}
              />
            </label>
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Invitation text</h3>

            <label className="settings-field">
              <span>Greeting</span>
              <input
                type="text"
                value={data.greeting}
                onChange={handleField("greeting")}
              />
            </label>

            <label className="settings-field">
              <span>Message</span>
              <input
                type="text"
                value={data.message}
                onChange={handleField("message")}
              />
            </label>

            <label className="settings-field">
              <span>Question</span>
              <input
                type="text"
                value={data.question}
                onChange={handleField("question")}
              />
            </label>

            <label className="settings-field">
              <span>YES button label</span>
              <input
                type="text"
                value={data.yesLabel}
                onChange={handleField("yesLabel")}
              />
            </label>

            <label className="settings-field">
              <span>NO button replies (one per line, shown in order)</span>
              <textarea
                rows={5}
                value={(data.noLabels ?? []).join("\n")}
                onChange={handleNoLabels}
              />
            </label>
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Success screen</h3>

            <label className="settings-field">
              <span>Title</span>
              <input
                type="text"
                value={data.successTitle}
                onChange={handleField("successTitle")}
              />
            </label>

            <label className="settings-field">
              <span>Message</span>
              <input
                type="text"
                value={data.successMessage}
                onChange={handleField("successMessage")}
              />
            </label>

            <label className="settings-field">
              <span>Share button label</span>
              <input
                type="text"
                value={data.shareLabel}
                onChange={handleField("shareLabel")}
              />
            </label>
          </section>

          <button type="button" className="settings-reset" onClick={onReset}>
            Reset to defaults
          </button>
        </div>
      </div>
    </div>
  );
}
