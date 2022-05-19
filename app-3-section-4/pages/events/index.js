import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/event-search";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function EventsPage(props) {
  const { events } = props;
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="All Events" content="Find all of the events" />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default EventsPage;

export async function getStaticProps(context) {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
