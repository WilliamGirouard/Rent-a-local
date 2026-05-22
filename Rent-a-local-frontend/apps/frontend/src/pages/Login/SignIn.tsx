import { useState } from "react";
import "./SignIn.css";
import { Form, Link, useActionData } from "react-router-dom";

export default function SignIn() {
  const error = useActionData() as string;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <div className="signIn-grid">
      <Form className="login-form" method="POST" replace>
        <div className="formsTitle">
          <h2 className="title">Rent-a-local</h2>
          <h3 className="subtitle">Sign In</h3>
        </div>

        <div className="inputs">
          <div className="email">
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="password">
            <input
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="showPassword">
            <button
              type="button"
              className="showPasswordButton"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              👁
            </button>
          </div>
        </div>

        {error && (
          <div className="errorMessage">
            <h3>{error}</h3>
          </div>
        )}

        <div className="signInButton">
          <button type="submit">Sign In</button>
        </div>

        <div className="navToSignUp">
          <h3>
            You do not have an account? <Link to="/signup">Sign Up</Link>
          </h3>
        </div>

        <div className="navToHomepage">
          <h3>
            Just want to take a look? <Link to="/">Homepage</Link>
          </h3>
        </div>
      </Form>
    </div>
  );
}
