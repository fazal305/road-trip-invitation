import { useState } from "react";
import InvitationCard from "./components/InvitationCard";
import SuccessState from "./components/SuccessState";
import SettingsPanel from "./components/SettingsPanel";
import { useInvitationData } from "./hooks/useInvitationData";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { data, updateData, resetData } = useInvitationData();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <button
        type="button"
        className="settings-trigger"
        onClick={() => setSettingsOpen(true)}
        aria-label="Open settings"
      >
        ⚙️
      </button>

      {accepted ? (
        <div className="invitation-card">
          <SuccessState data={data} />
        </div>
      ) : (
        <InvitationCard data={data} onAccept={() => setAccepted(true)} />
      )}

      {settingsOpen && (
        <SettingsPanel
          data={data}
          onChange={updateData}
          onReset={resetData}
          theme={theme}
          onToggleTheme={toggleTheme}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
