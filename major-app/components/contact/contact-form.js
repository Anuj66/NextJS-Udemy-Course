import classes from "./contact-form.module.css";
import {useEffect, useState} from "react";
import Notification from "../../ui/notification";

function ContactForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState("");
    const [requestError, setRequestError] = useState("");

    useEffect(() => {
        if (requestStatus === "success" || requestStatus === "error") {
            if(requestStatus === 'success'){
                setName('')
                setMessage('')
                setEmail('')
            }
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function submitFormHandler(event) {
        event.preventDefault();

        setRequestStatus("pending");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    name: name,
                    message: message,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setRequestStatus("success");
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus("error");
        }
    }

    let notification;
    if (requestStatus === "pending") {
        notification = {
            status: "pending",
            title: "Loading message...",
            message: "Your message is on its way!",
        };
    }
    if (requestStatus === "success") {
        notification = {
            status: "success",
            title: "Success!",
            message: "Message sent successfully!",
        };
    }
    if (requestStatus === "error") {
        notification = {
            status: "error",
            title: "Error!",
            message: requestError,
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form onSubmit={submitFormHandler} className={classes.form}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id={"email"}
                            required={true}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id={"name"}
                            required={true}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows="5"
                        required={true}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    <button type={"submit"}>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
}

export default ContactForm