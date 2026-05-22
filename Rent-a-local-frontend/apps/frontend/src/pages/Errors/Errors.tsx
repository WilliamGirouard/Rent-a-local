import { useRouteError, Link } from "react-router-dom";
import "./Errors.css";

export default function Error() {
  const error: any = useRouteError();
  const status = error?.status || error?.response?.status;
  const message = error?.message || "An unexpected error occurred.";

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-code">{status || "?"}</div>
        <div className="error-info">
          <h1 className="error-title">
            {status === 404 ? "Page not found." : "Something went wrong."}
          </h1>
          <div className="error-divider" />
          <p className="error-message">{message}</p>
          <Link to="/" className="error-back-btn">← Go back to safety</Link>
        </div>
      </div>
    </div>
  );
}