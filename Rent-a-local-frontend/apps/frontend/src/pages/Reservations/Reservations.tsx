import { Link, useLoaderData } from "react-router-dom";
import "./Reservations.css";

interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  paid: boolean;
  user: {
    firstName: string;
    lastName: string;
  };
  local: {
    name: string;
    address: string;
  };
}

export default function Reservations() {
  const reservations = useLoaderData() as Reservation[];

  return (
    <>
      <div className="reservations-page">
        <div className="reservations-header">
          <h1>List of Reservations</h1>
          <p>Manage and review all the bookings.</p>
        </div>

        {reservations.length === 0 ? (
          <div className="emptyReservations">
            <h3>You have no reservations yet.</h3>
            <Link to="/" className="browseButton">
              Browse Locals
            </Link>
          </div>
        ) : (
          <div className="reservations-list">
            {reservations.map((r) => (
              <Link
                key={r.id}
                to={`/reservations/${r.id}`}
                className="reservation-card"
              >
                <h3>{r.local?.name ?? `Reservation #${r.id}`}</h3>
                <p className="card-address">
                  {r.local?.address ?? "Address unavailable"}
                </p>
                <div className="card-info">
                  <div className="card-row">
                    <span>Check-in</span>
                    <span>{new Date(r.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="card-row">
                    <span>Check-out</span>
                    <span>{new Date(r.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="card-row">
                    <span>Reserved by</span>
                    <span>
                      {r.user.firstName} {r.user.lastName}
                    </span>
                  </div>
                </div>

                <span
                  className={`reservation-status ${r.paid ? "paid" : "pending"}`}
                >
                  {r.paid ? "Paid" : "Pending Payment"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
