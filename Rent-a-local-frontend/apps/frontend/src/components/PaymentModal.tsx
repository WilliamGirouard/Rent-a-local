import { useState } from "react";

interface PaymentReceipt {
  transactionId: string;
  amount: number;
  currency: string;
  paidAt: Date;
  status: "approved";
}

interface PaymentModalProps {
  isOpen: boolean;
  totalPrice: number;
  localName: string;
  guestName: string;
  startDate: string;
  endDate: string;
  onClose: () => void;
  onConfirm: () => Promise<PaymentReceipt>;
}

export default function PaymentModal({
  isOpen,
  totalPrice,
  localName,
  guestName,
  startDate,
  endDate,
  onClose,
  onConfirm,
}: PaymentModalProps) {

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const sanitized = cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(sanitized)) return setError("Invalid card number.");
    if (!cardHolder.trim()) return setError("Cardholder name required.");
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return setError("Invalid expiry — use MM/YY.");
    if (!/^\d{3,4}$/.test(cvv)) return setError("Invalid CVV.");

    setLoading(true);
    try {
      const result = await onConfirm();
      setReceipt(result);
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setReceipt(null);
    setCardNumber("");
    setCardHolder("");
    setExpiry("");
    setCvv("");
    setError("");
    onClose();
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-CA", { dateStyle: "medium" });

  if (receipt) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>

          <div className="success-checkmark">✓</div>

          <div className="modal-heading">
            <h2>Payment Successful</h2>
            <p className="transaction-id">#{receipt.transactionId}</p>
          </div>

          <div className="receipt-summary">

            <div className="receipt-row">
              <span>Guest</span>
              <span>{guestName}</span>
            </div>

            <div className="receipt-row">
              <span>Local</span>
              <span>{localName}</span>
            </div>

            <div className="receipt-row">
              <span>Dates</span>
              <span>{formatDate(startDate)} → {formatDate(endDate)}</span>
            </div>

            <div className="receipt-row">
              <span>Paid on</span>
              <span>
                {new Date(receipt.paidAt).toLocaleDateString("en-CA", { dateStyle: "medium" })}
              </span>
            </div>

            <div className="receipt-row receipt-total">
              <span>Total</span>
              <span>${Number(receipt.amount).toFixed(2)} {receipt.currency}</span>
            </div>
          </div>

          <div className="modal-actions">
            <button className="modal-btn confirm-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-heading">
          <h2>Complete Payment</h2>
          <p>Total: <strong>${Number(totalPrice || 0).toFixed(2)}</strong></p>
        </div>

        <form onSubmit={handleSubmit} className="card-form">

          <input
            className="card-input"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <input
            className="card-input"
            placeholder="Cardholder Name"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />

          <div className="card-row">
            <input
              className="card-input"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <input
              className="card-input"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="modal-btn cancel-btn" onClick={handleClose}>
              Cancel
            </button>

            <button type="submit" className="modal-btn confirm-btn" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}