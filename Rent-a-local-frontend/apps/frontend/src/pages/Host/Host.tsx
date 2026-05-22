import { useLoaderData, Link } from "react-router-dom";
// @ts-ignore: Importing CSS for side effects without type declarations
import "./Host.css";


interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  paid: boolean;
  local?: {
    id: number;
    name: string;
    address: string;
  };
}

interface LoaderData {
  user: {
    firstName: string;
    lastName: string;
    role: string;
  };
  reservations: Reservation[];
}

export default function Host() {
  const { user, reservations } = useLoaderData() as LoaderData;

  const isAdmin = user.role === "administrator";
  const today = new Date();

  const currentReservations = reservations.filter(
    (r) => new Date(r.endDate) >= today
  );

  const pastReservations = reservations.filter(
    (r) => new Date(r.endDate) < today
  );

  return (
    <>
    <div className="host-page">
      <div className="welcome-message">
        <h1>
          Hi {user.firstName} {user.lastName}!
          
        </h1>
        

        {isAdmin && (
          <Link to="/reservations" className="admin-reservations-btn">
            Manage All Reservations →
          </Link>
        )}
      </div>

      <div className="host-section">
        <div className="host-current-reservation">
          <h2>Your current reservations:</h2>

          <div className="list-current-reservation">
            {currentReservations.length === 0 ? (
              <p>No current reservations.</p>
            ) : (
              currentReservations.map((r) => (
                <Link key={r.id} to={`/reservations/${r.id}`} className="reservation-card">
                  <h3>{r.local?.name ?? "Unknown local"}</h3>
                  <p className="card-address">{r.local?.address ?? "Address unavailable"}</p>
                  <p className="card-dates">
                    {new Date(r.startDate).toLocaleDateString()} -{" "}
                    {new Date(r.endDate).toLocaleDateString()}
                  </p>
                  <span className={`reservation-status ${r.paid ? "paid" : "pending"}`}>
                    {r.paid ? "Paid" : "Pending Payment"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="host-section">
        <div className="host-history-reservation">
          <h2>Your reservation history:</h2>

          <div className="list-history-reservation">
            {pastReservations.length === 0 ? (
              <p>No past reservations.</p>
            ) : (
              pastReservations.map((r) => (
                <Link key={r.id} to={`/reservations/${r.id}`} className="reservation-card">
                  <h3>{r.local?.name ?? "Unknown local"}</h3>
                  <p>{r.local?.address ?? "Address unavailable"}</p>
                  <p>
                    {new Date(r.startDate).toLocaleDateString()} -{" "}
                    {new Date(r.endDate).toLocaleDateString()}
                  </p>
                  <span className={`reservation-status ${r.paid ? "paid" : "pending"}`}>
                    {r.paid ? "Paid" : "Pending Payment"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}