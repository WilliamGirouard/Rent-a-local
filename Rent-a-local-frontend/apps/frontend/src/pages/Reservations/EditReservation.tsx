import { useLoaderData, Link, Form, useNavigation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./EditReservation.css";

interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  local: {
    name: string;
    address: string;
  };
}

export default function EditReservation() {
  const reservation = useLoaderData() as Reservation;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Format date to yyyy-MM-dd for input[type=date]
  const toInputDate = (iso: string) => iso.split("T")[0];
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="edit-reservation-page">
        <div className="edit-header">
          <p className="edit-eyebrow">Reservation #{reservation.id}</p>
          <h1>{reservation.local?.name}</h1>
          <p className="edit-address">{reservation.local?.address}</p>
        </div>

        <div className="edit-card">
          <h2 className="edit-card-title">Modify Dates</h2>

          <Form method="post" className="edit-form">
            <div className="edit-field">
              <label htmlFor="startDate">Check-in</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                defaultValue={toInputDate(reservation.startDate)}
                min={today}
                required
              />
            </div>

            <div className="edit-field">
              <label htmlFor="endDate">Check-out</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                defaultValue={toInputDate(reservation.endDate)}
                min={today}
                required
              />
            </div>

            <div className="edit-actions">
              <Link to={`/reservations/${reservation.id}`} className="edit-btn-cancel">
                Cancel
              </Link>
              <button type="submit" className="edit-btn-submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}