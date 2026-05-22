import { Form, Link, useLocation } from "react-router-dom";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface NavbarTypeParameter {
  user: User | null;
}

export default function Navbar({ user }: NavbarTypeParameter) {
  const location = useLocation();

  const navStyle = {
    position: "fixed" as const,
    top: 0,
    width: "100%",
    zIndex: 50,
    background: "#111111",
    borderBottom: "1px solid #2a2a2a",
    height: "64px",
  };

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
  };

  const linksStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  const linkStyle = (active: boolean) => ({
    textDecoration: "none",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: active ? 700 : 500,
    color: active ? "#ffffff" : "#888888",
    transition: "color 0.15s",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.2px",
  });

  const logoStyle = {
    fontSize: "20px",
    fontWeight: 900,
    textDecoration: "none",
    letterSpacing: "-0.5px",
    background: "linear-gradient(135deg, #F40000, #F4796B)",
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    color: "transparent",
  };

  const isAdmin = user?.role === "administrator";

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          <span style={logoStyle}>Rent-a-local !</span>
        </Link>

        <div style={linksStyle}>
          {user ? (
            <>
              <Link to="/" style={linkStyle(location.pathname === "/")}>
                Accueil
              </Link>
              <Link to="/host" style={linkStyle(location.pathname === "/host")}>
                Profile
              </Link>
              {isAdmin ? (
                <Link to="/admin" style={linkStyle(location.pathname === "/admin")}>
                  Dashboard
                </Link>
              ) : (
                <Link to="/contact" style={linkStyle(location.pathname === "/contact")}>
                  Contact
                </Link>
              )}
              <Form
                method="post"
                action="/logout"
                style={{ display: "flex", margin: 0, padding: 0 }}
              >
                <button
                  type="submit"
                  style={{
                    ...linkStyle(false),
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    fontFamily: "inherit",
                    fontSize: "15px",
                    lineHeight: "normal",
                  }}
                >
                  Déconnexion
                </button>
              </Form>
            </>
          ) : (
            <>
              <Link to="/" style={linkStyle(location.pathname === "/")}>
                Accueil
              </Link>
              <Link to="/signin" style={linkStyle(location.pathname === "/signin")}>
                Connexion
              </Link>
              <Link to="/signup" style={linkStyle(location.pathname === "/signup")}>
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}