import { useRef } from "react";
import invitation from "../data/invitation";
import InvitationDetails from "./InvitationDetails";
import InvitationButtons from "./InvitationButtons";

/**
 * The pre-acceptance invitation view: details + YES/NO buttons.
 * `onAccept` is called when the user clicks YES.
 */
export default function InvitationCard({ onAccept }) {
  const detailsRef = useRef(null);

  return (
    <div className="invitation-card">
      <div ref={detailsRef}>
        <InvitationDetails data={invitation} />
      </div>
      <InvitationButtons
        data={invitation}
        onYes={onAccept}
        avoidRefs={[detailsRef]}
      />
    </div>
  );
}
