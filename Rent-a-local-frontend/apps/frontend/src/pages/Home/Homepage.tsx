import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Maps, { Local } from "../../components/Maps";

interface LoaderData {
  locals: Local[];
}

export default function Homepage() {
  const { locals } = useLoaderData() as LoaderData;
  const [selectedLocal, setSelectedLocal] = useState<Local | null>(null);
  const navigate = useNavigate();

  function handleReserveClick(localId: number) {
  console.log("Reserve clicked", localId);

  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token, saving redirect");

    localStorage.setItem("redirectAfterLogin", `/locals/${localId}`);

    console.log(
      "Saved:",
      localStorage.getItem("redirectAfterLogin")
    );

    navigate("/signin");
  } else {
    navigate(`/locals/${localId}`);
  }
}

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        paddingTop: "64px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 30px 30px",
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            animation: "fadeInUp 0.6s ease",
          }}
        >
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            Trouvez votre espace idéal à Montréal
          </h1>
          <p style={{ fontSize: "14px", color: "#888888", marginTop: "8px" }}>
            Découvrez les meilleurs locaux commerciaux et résidentiels
          </p>
        </div>

        <div
          style={{ display: "flex", gap: "16px", flex: 1, overflow: "hidden" }}
        >
          <div
            style={{
              flex: "0 0 36%",
              backgroundColor: "#111111",
              border: "1px solid #2a2a2a",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #2a2a2a",
              }}
            >
              <h2
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#555555",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {locals.length} Locaux disponibles
              </h2>
              <p
                style={{ margin: "8px 0 0", fontSize: "0.9rem", opacity: 0.95 }}
              >
                Cherchez nos espaces louables à Montréal
              </p>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
              {locals.map((local: Local) => (
                <div
                  key={local.id}
                  onClick={() => setSelectedLocal(local)}
                  style={{
                    padding: "16px",
                    marginBottom: "4px",
                    backgroundColor:
                      selectedLocal?.id === local.id
                        ? "#1a1a1a"
                        : "transparent",
                    border:
                      selectedLocal?.id === local.id
                        ? "1px solid #F40000"
                        : "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    borderLeft:
                      selectedLocal?.id === local.id
                        ? "3px solid #F40000"
                        : "3px solid transparent",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "4px",
                      }}
                    >
                      {local.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#888888",
                        marginBottom: "6px",
                      }}
                    >
                      {local.address}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#F40000",
                      }}
                    >
                      {local.lat.toFixed(5)}, {local.lng.toFixed(5)}
                    </p>
                  </div>

                  {selectedLocal?.id === local.id && (
                    <div
                      style={{
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid #2a2a2a",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReserveClick(local.id);
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "8px 18px",
                          backgroundColor: "#F40000",
                          color: "white",
                          border: "none",
                          textDecoration: "none",
                          fontSize: "13px",
                          fontWeight: 700,
                          letterSpacing: "0.3px",
                          transition: "background-color 0.15s",
                          cursor: "pointer",
                        }}
                      >
                        Réserver maintenant
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid #2a2a2a",
                textAlign: "center",
              }}
            ></div>
          </div>

          <div
            style={{
              flex: "0 0 62%",
              border: "1px solid #2a2a2a",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <Maps
              locals={locals}
              onMarkerClick={(local: Local) => setSelectedLocal(local)}
            />
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}