import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/results-title/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

function FilterEvent(props) {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className={"center"}>Loading...</p>;
  }

  const { filteredEvents, year, month } = props;

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${month} - ${year}`} />
    </Head>
  );

  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid Filter, Please the check the values!</p>
        </ErrorAlert>
        <div className={"center"}>
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No Events found for the chosen filter!</p>
        </ErrorAlert>
        <div className={"center"}>
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <div>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilterEvent;

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents: filteredEvents,
      year: numYear,
      month: numMonth,
    },
  };
}
