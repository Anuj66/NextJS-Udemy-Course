import { useRouter } from "next/router";
import { getAllEvents, getEventById } from "../../dummy-data";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

function EventPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Event found!</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventPage;

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.id;
  const event = await getEventById(id);
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const eventIds = events.map((event) => event.id);
  const ids = eventIds.map((eventId) => ({ params: { id: eventId } }));

  return {
    paths: ids,
    fallback: false,
  };
}
