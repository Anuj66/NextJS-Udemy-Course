import classes from "./newsletter-registration.module.css";
import validator from "validator";
import { useContext, useRef, useState } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const [emailError, setEmailError] = useState(false);
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const email = emailRef.current.value;

    // optional: validate input
    if (email && email !== "" && validator.isEmail(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }

    notificationCtx.showNotification({
      title: "Signing Up...",
      message: "Registering for Newsletter",
      status: "pending",
    });

    // send valid data to API
    if (!emailError) {
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          body: JSON.stringify({
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went Wrong");
        }
        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully registered for Newsletter",
          status: "success",
        });
      } catch (e) {
        notificationCtx.showNotification({
          title: "Error",
          message: e.message || "Something went wrong",
          status: "error",
        });
      }
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          {emailError && <span>Not a valid Email!</span>}
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
