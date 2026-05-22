import { useLoaderData, Link, useNavigate, Form } from "react-router-dom";
import { useState } from "react";
import {
  approveChangeRequest,
  rejectChangeRequest,
  upgradeUserToAdmin,
} from "../../services/api";
import "./AdminDashboard.css";

interface ChangeRequest {
  id: number;
  newStartDate: string;
  newEndDate: string;
  status: string;
  reservation: {
    id: number;
    startDate: string;
    endDate: string;
    local: { name: string; address: string };
  };
  user: { id: number; firstName: string; lastName: string; email: string };
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface LoaderData {
  user: { firstName: string; lastName: string };
  changeRequests: ChangeRequest[];
  users: User[];
}

export default function AdminDashboard() {
  const { user, changeRequests, users } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [upgradingId, setUpgradingId] = useState<number | null>(null);

  async function handleApprove(id: number) {
    setLoadingId(id);
    try {
      await approveChangeRequest(id);
      navigate(0);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoadingId(null);
    }
  }

  async function handleReject(id: number) {
    setLoadingId(id);
    try {
      await rejectChangeRequest(id);
      navigate(0);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoadingId(null);
    }
  }

  async function handleUpgrade(id: number) {
    setUpgradingId(id);
    try {
      await upgradeUserToAdmin(id);
      navigate(0);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpgradingId(null);
    }
  }

  const regularUsers = users.filter((u) => u.role !== "administrator");

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p className="admin-subtitle">Bienvenue, {user.firstName}!</p>
      </div>

      <div className="admin-actions-bar">
        <Link to="/reservations" className="admin-btn-red">
          Voir toutes les réservations →
        </Link>
        <Link to="/admin/create-local" className="admin-btn-outline">
          + Ajouter un local
        </Link>     
      </div>

      {/* Change Requests */}
      <div className="admin-section">
        <h2 className="admin-section-title">Demandes de changement d'heure</h2>

        {changeRequests.length === 0 ? (
          <p className="admin-empty">Aucune demande en attente.</p>
        ) : (
          <div className="admin-list">
            {changeRequests.map((cr) => (
              <div key={cr.id} className="admin-card">
                <div className="admin-card-info">
                  <h3>{cr.reservation?.local?.name ?? "Local inconnu"}</h3>
                  <p className="admin-card-address">
                    {cr.reservation?.local?.address}
                  </p>
                  <p className="admin-card-meta">
                    Par: {cr.user?.firstName} {cr.user?.lastName} —{" "}
                    {cr.user?.email}
                  </p>
                  <div className="admin-card-dates">
                    <span>
                      Actuel:{" "}
                      {new Date(cr.reservation?.startDate).toLocaleDateString()}{" "}
                      → {new Date(cr.reservation?.endDate).toLocaleDateString()}
                    </span>
                    <span className="admin-arrow">→</span>
                    <span className="admin-new-dates">
                      Demandé: {new Date(cr.newStartDate).toLocaleDateString()}{" "}
                      → {new Date(cr.newEndDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="admin-card-actions">
                  <button
                    className="admin-btn-approve"
                    onClick={() => handleApprove(cr.id)}
                    disabled={loadingId === cr.id}
                  >
                    {loadingId === cr.id ? "..." : "Approuver"}
                  </button>
                  <button
                    className="admin-btn-reject"
                    onClick={() => handleReject(cr.id)}
                    disabled={loadingId === cr.id}
                  >
                    {loadingId === cr.id ? "..." : "Rejeter"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upgrade Users */}
      <div className="admin-section">
        <h2 className="admin-section-title">Promouvoir un utilisateur admin</h2>

        {regularUsers.length === 0 ? (
          <p className="admin-empty">Aucun utilisateur régulier.</p>
        ) : (
          <div className="admin-list">
            {regularUsers.map((u) => (
              <div key={u.id} className="admin-card admin-card-user">
                <div className="admin-card-info">
                  <h3>
                    {u.firstName} {u.lastName}
                  </h3>
                  <p className="admin-card-meta">{u.email}</p>
                  <p className="admin-card-meta">ID: #{u.id}</p>
                </div>
                <div className="admin-card-actions">
                  <button
                    className="admin-btn-red"
                    onClick={() => handleUpgrade(u.id)}
                    disabled={upgradingId === u.id}
                  >
                    {upgradingId === u.id ? "..." : "Rendre Admin"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
