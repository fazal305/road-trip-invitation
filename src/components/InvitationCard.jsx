import { useRef } from "react";
import InvitationDetails from "./InvitationDetails";
import InvitationButtons from "./InvitationButtons";

/**
 * The pre-acceptance invitation view: details + YES/NO buttons.
 * `data` is the (possibly user-edited) invitation config.
 * `onAccept` is called when the user clicks YES.
 */
export default function InvitationCard({ data, onAccept }) {
  const detailsRef = useRef(null);

  return (
    <div className="invitation-card">
      <div ref={detailsRef}>
        <InvitationDetails data={data} />
      </div>
      <InvitationButtons
        data={data}
        onYes={onAccept}
        avoidRefs={[detailsRef]}
      />
    </div>
  );
}
