import { useState } from "react";
import InvitationCard from "./components/InvitationCard";
import SuccessState from "./components/SuccessState";

function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="app-shell">
      {accepted ? (
        <div className="invitation-card">
          <SuccessState />
        </div>
      ) : (
        <InvitationCard onAccept={() => setAccepted(true)} />
      )}
    </div>
  );
}

export default App;
