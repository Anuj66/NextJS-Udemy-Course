import ContactForm from "../components/contact/contact-form";
import { Fragment } from "react";
import Head from "next/head";

function ContactPage(props) {
  return (
    <Fragment>
      <Head>
        <title>Contact Page</title>
        <meta name={'description'} content={'Send me your messages'}/>
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default ContactPage;