import { useLoaderData, Link, useNavigate, useActionData } from "react-router-dom";
import "./ReservationDetails.css";
import { deleteReservation, payReservation, toggleReservationPaymentStatus, } from "../../services/api";
import { useState } from "react";
import PaymentModal from "../../components/PaymentModal";

interface Local {
  id: number;
  name: string;
  address: string;
  pricePerDay: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface LoaderData {
  id: number;
  startDate: string;
  endDate: string;
  paid: boolean;
  local: Local;
  user: User;
  currentUserRole: string;
  currentUserId: number;
}

export default function ReservationDetails() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const data = useLoaderData() as LoaderData;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isAdmin = data.currentUserRole === "administrator";
  const isOwner = data.currentUserId === data.user?.id;

  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const today = new Date();

  const jours = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const totalPrice = (data.local?.pricePerDay ?? 0) * jours;
  const isFuture = start > today;
  const canAct = isFuture && !data.paid;

  async function handlePaymentToggle() {
  await toggleReservationPaymentStatus(data.id, !data.paid);
  navigate(0);
}

  async function handlePayment() {
    const receipt = await payReservation(data.id);
    return receipt;
  }
  async function handleDeleteReservation() {
    try {
      await deleteReservation(data.id);
      alert("Deletion successful");
      navigate("/reservations")
    }catch(e : any) {
      setError(e.message);
    }
  }

  function handleModalClose() {
    setShowPaymentModal(false);
    navigate(0);
  }

  return (
    <>
      <div className="reservation-details-page">
        <div className="rd-header">
          <div className="rd-header-text">
            <p className="rd-eyebrow">Reservation #{data.id}</p>
            <h1>
              {data.local?.name ?? "Unknown Local"}
              {isAdmin && data.local?.id && (
                <span className="rd-id-badge">(#{data.local.id})</span>
              )}
            </h1>
            <p className="rd-address">{data.local?.address}</p>
          </div>

          <span className={`rd-status ${data.paid ? "paid" : "pending"}`}>
            {data.paid ? "Paid" : "Pending Payment"}
          </span>
        </div>

        <div className="rd-grid">
          <div className="rd-card">
            <h2 className="rd-card-title">Booking Details</h2>

            <div className="rd-row">
              <span className="rd-label">Check-in</span>
              <span className="rd-value">
                {start.toLocaleDateString("en-CA", { dateStyle: "medium" })}
              </span>
            </div>

            <div className="rd-row">
              <span className="rd-label">Check-out</span>
              <span className="rd-value">
                {end.toLocaleDateString("en-CA", { dateStyle: "medium" })}
              </span>
            </div>

            <div className="rd-row">
              <span className="rd-label">Duration</span>
              <span className="rd-value">
                {jours} jour{jours > 1 ? "s" : ""}
              </span>
            </div>

            <div className="rd-divider" />

            <div className="rd-row rd-total">
              <span className="rd-label">
                ${Number(data.local?.pricePerDay ?? 0).toFixed(2)} × {jours}{" "}
                jours
              </span>
              <span className="rd-value rd-price">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="rd-card">
            <h2 className="rd-card-title">
              {isAdmin ? "Guest" : "Your Account"}
            </h2>

            <div className="rd-row">
              <span className="rd-label">Name</span>
              <span className="rd-value">
                {data.user?.firstName} {data.user?.lastName}
                {isAdmin && data.user?.id && (
                  <span className="rd-id-inline">(#{data.user.id})</span>
                )}
              </span>
            </div>

            <div className="rd-row">
              <span className="rd-label">Email</span>
              <span className="rd-value">{data.user?.email}</span>
            </div>
          </div>
        </div>

        <div className="rd-actions">
          {isAdmin && (
            <button
              className={`rd-btn ${data.paid ? "rd-btn-unpaid" : "rd-btn-paid"}`}
              onClick={handlePaymentToggle}
            >
              {data.paid ? "Mark as Unpaid" : "Mark as Paid"}
            </button>
          )}
          {isAdmin && (
            <button
              className="rd-btn rd-btn-unpaid" 
              onClick={handleDeleteReservation}
            >
              Supprimer la réservation
            </button>
          )}

          {isOwner && canAct && (
            <button
              className="rd-btn rd-btn-paid"
              onClick={() => setShowPaymentModal(true)}
            >
              Pay Now
            </button>
          )}

          {isOwner && canAct && (
            <Link
              to={`/reservations/${data.id}/change-request`}
              className="rd-btn rd-btn-change"
            >
              Demander un changement d'heure
            </Link>
          )}
            {error && ( 
              <div className="delete-reservation-error"> 
                  {error}
                </div>
            )}
        </div>

        <div className="back-link">
          <Link to={isAdmin ? "/reservations" : "/host"}>
            ← Back to {isAdmin ? "Reservations" : "My Reservations"}
          </Link>
        </div>

        <PaymentModal
          isOpen={showPaymentModal}
          totalPrice={totalPrice}
          localName={data.local?.name ?? ""}
          guestName={`${data.user?.firstName} ${data.user?.lastName}`}
          startDate={data.startDate}
          endDate={data.endDate}
          onClose={handleModalClose}
          onConfirm={handlePayment}
        />
      </div>
    </>
  );
}
