import "./Contact.css";
import { Form, useActionData } from "react-router-dom";

export default function Contact() {
  const error = useActionData() as string;

  return (
    <>

    <div className="contact-grid">
      <Form className="contact-form" method="POST" onSubmit={() => alert("Submission successful")} replace>
        <div className="formsTitle">
          <h2 className="title">Rent-a-local</h2>
          <h3 className="subtitle">Contact us</h3>
          <h4 className="description">
            For any questions regarding reservations or local information, please contact us by email.
          </h4>
        </div>
        <div className="inputs">
          <div className="name">
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
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
          <div className="message">
            <textarea
              name="message"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
        </div>

        {error && (
          <div className="errorMessage">
            <h3>{error}</h3>
          </div>
        )}
        <div className="contactButton">
          <button type="submit">Send Email</button>
        </div>
      </Form>
    </div>
    </>
  );
}
