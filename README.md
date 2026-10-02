# Road Trip Invitation 🚗

**Live Demo:** [road-trip-invitation-convoy.netlify.app](https://road-trip-invitation-convoy.netlify.app)

A single playful invitation page for inviting friends on a road trip — inspired
by the "Plan Your Date" runaway-button interaction, adapted for group hype
instead of romance. No backend, no accounts, no dashboards — just one shareable
link.

## Run it

```bash
npm install
npm run dev
```

## Customize the invitation

Edit `src/data/invitation.js` — route, date, time, all copy, the NO-button
label progression, and the share text all live there. No JSX changes needed
to reuse this for a different trip.

## How the runaway NO button works

- `src/utils/randomPosition.js` — pure function that picks a random in-viewport
  position, avoiding overlap with other elements and staying clear of the
  previous position and the pointer, with graceful constraint relaxation so
  it always returns something valid.
- `src/hooks/useRunawayButton.js` — the behavior: dodges as the mouse gets
  close (desktop), dodges on press (touch/pen), and dodges on keyboard
  activation too, so no input method gets stuck. Tracks attempt count and the
  current button label.

## Structure

```
src/
├── components/       InvitationCard, InvitationDetails, InvitationButtons,
│                      SuccessState, ShareButton
├── data/invitation.js  all copy & trip details
├── hooks/useRunawayButton.js
├── utils/randomPosition.js
├── App.jsx, main.jsx, index.css
```
