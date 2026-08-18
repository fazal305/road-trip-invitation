import { useEffect, useState } from "react";
import defaultInvitation from "../data/invitation";

const STORAGE_KEY = "roadtrip-invitation-overrides";

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Invitation content, editable at runtime from the settings panel and
 * persisted to localStorage. Defaults always come from
 * src/data/invitation.js; only fields the user has changed are stored.
 */
export function useInvitationData() {
  const [overrides, setOverrides] = useState(loadOverrides);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      // Storage unavailable (private browsing, quota) — edits still work
      // for the current session, just won't persist across reloads.
    }
  }, [overrides]);

  function updateData(partial) {
    setOverrides((prev) => ({ ...prev, ...partial }));
  }

  function resetData() {
    setOverrides({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return {
    data: { ...defaultInvitation, ...overrides },
    updateData,
    resetData,
  };
}
