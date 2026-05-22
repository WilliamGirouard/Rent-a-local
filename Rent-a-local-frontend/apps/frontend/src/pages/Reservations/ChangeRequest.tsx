import { useLoaderData, Link, Form, useNavigation, useActionData } from "react-router-dom";
import "./ChangeRequest.css";

interface LoaderData {
  id: number;
  user: { id: number };
  local: { name: string; address: string };
}

export default function ChangeRequest() {
  const data = useLoaderData() as LoaderData;
  const navigation = useNavigation();
  const error = useActionData() as string;
  const isSubmitting = navigation.state === "submitting";

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="edit-reservation-page">
        <div className="edit-header">
          <p className="edit-eyebrow">Reservation #{data.id}</p>
          <h1>{data.local?.name}</h1>
          <p className="edit-address">{data.local?.address}</p>
        </div>

        <div className="edit-card">
          <h2 className="edit-card-title">Demander un changement de dates</h2>

          <Form method="post" className="edit-form">
            <input type="hidden" name="reservationId" value={data.id} />
            <input type="hidden" name="userId" value={data.user?.id} />

            <div className="edit-field">
              <label htmlFor="newStartDate">Nouvelle date de début</label>
              <input
                type="date"
                id="newStartDate"
                name="newStartDate"
                min={today}
                required
              />
            </div>

            <div className="edit-field">
              <label htmlFor="newEndDate">Nouvelle date de fin</label>
              <input
                type="date"
                id="newEndDate"
                name="newEndDate"
                min={today}
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="edit-actions">
              <Link
                to={`/reservations/${data.id}`}
                className="edit-btn-cancel"
              >
                Annuler
              </Link>
              <button
                type="submit"
                className="edit-btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi..." : "Envoyer la demande"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}