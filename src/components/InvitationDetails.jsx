/**
 * Presentational block: header, greeting, route, date/time badges, question.
 * All copy comes from `data` (see src/data/invitation.js) — nothing here is
 * hardcoded trip content.
 */
export default function InvitationDetails({ data }) {
  return (
    <>
      <div className="invitation-emoji" aria-hidden="true">
        {data.emojiHeader}
      </div>
      <p className="invitation-title">{data.title}</p>
      <p className="invitation-greeting">{data.greeting}</p>
      <p className="invitation-message">{data.message}</p>

      <div className="route" aria-label={`${data.origin} to ${data.destination}`}>
        <span className="route-place">{data.origin}</span>
        <span className="route-arrow" aria-hidden="true">↓</span>
        <span className="route-arrow" aria-hidden="true">🚗</span>
        <span className="route-arrow" aria-hidden="true">↓</span>
        <span className="route-place">{data.destination}</span>
      </div>

      <div className="badge-row">
        <span className="badge">📅 {data.date}</span>
        <span className="badge">⏰ {data.time}</span>
      </div>

      <p className="invitation-question">{data.question}</p>
    </>
  );
}
