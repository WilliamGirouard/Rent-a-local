import { useState } from "react";
import "./SignUp.css";
import { Form, Link, useActionData } from "react-router-dom";

export default function SignUp() {
  const error = useActionData() as string;

  const [arePasswordsVisible, setArePasswordsVisible] =
    useState<boolean>(false);

  return (
    <div className="signUp-grid">
      <Form className="register-form" method="POST" replace>
        <div className="formsTitle">
          <h2 className="title">Rent-a-local</h2>
          <h3 className="subtitle">Sign Up</h3>
        </div>
        <div className="inputs">
          <div className="firstName">
            <input
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              required
            ></input>
          </div>
          <div className="lastName">
            <input
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              required
            ></input>
          </div>
          <div className="email">
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            ></input>
          </div>
          <div className="password">
            <input
              name="password"
              type={arePasswordsVisible ? "text" : "password"}
              placeholder="Enter your password"
              required
            ></input>
          </div>
          <div className="confirmPassword">
            <input
              name="confirmPassword"
              type={arePasswordsVisible ? "text" : "password"}
              placeholder="Confirm your password"
              required
            ></input>
          </div>
          <div className="showPassword">
            <button
              type="button"
              className="showPasswordButton"
              onClick={() => setArePasswordsVisible(!arePasswordsVisible)}
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
        <div className="signUpButton">
          <button type="submit">Sign Up</button>
        </div>
        <div className="navToSignIn">
          <h3>
            Already have an account ? <Link to="/signin">Sign In</Link>
          </h3>
        </div>
        <div className="navToHomepage">
          <h3>
            Just want to take a look ? <Link to="/">Homepage</Link>
          </h3>
        </div>
      </Form>
    </div>
  );
}
