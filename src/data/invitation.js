// All invitation copy and trip details live here.
// Edit this file to reuse the app for a different trip/invite —
// no JSX changes needed.

const invitation = {
  // --- Header / intro ---
  emojiHeader: "🚗",
  title: "ROAD TRIP INVITATION",
  greeting: "Yo! 👋",
  message: "We're going on a road trip!",

  // --- Trip details ---
  origin: "Karachi",
  destination: "Kund Malir",
  date: "Saturday, 12 September",
  time: "8:00 AM",

  // --- The ask ---
  question: "Wanna come with us?",

  // --- Buttons ---
  yesLabel: "YES! 🚗",
  // Progression of NO-button labels, shown in order as attempts increase.
  // The last label repeats for any attempts beyond the list length.
  noLabels: [
    "NO 😭",
    "Are you sure? 👀",
    "Think again 😂",
    "Come onnn",
    "You know you wanna go 🚗",
    "NOPE 😂",
    "Bro just say YES 😂",
    "You really thought NO was an option?",
    "Fine. One last chance. 😭",
  ],

  // --- Success state ---
  successEmojiHeader: "🎉 🚗 🎉",
  successTitle: "LET'S GOOOO!",
  successMessage: "You're officially coming.",
  successFooter: "See you there!",

  // --- Share ---
  shareLabel: "Share with the group",
  shareTitle: "Road Trip Invitation",
  shareText:
    "I'm in! 🚗 We're road-tripping from Karachi to Kund Malir on Saturday, 12 September, 8:00 AM. Wanna come too?",
};

export default invitation;
