import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/EventList";
import Head from "next/head";

function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name={"description"}
          content={"Here you can have access to all the nextJS great events!"}
        />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps(context) {
  const data = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: data,
    },
    revalidate: 1800,
  };
}
