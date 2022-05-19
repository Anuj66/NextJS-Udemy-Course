// const DUMMY_EVENTS = [
//     {
//         id: 'e1',
//         title: 'Programming for everyone',
//         description:
//             'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
//         location: 'Somestreet 25, 12345 San Somewhereo',
//         date: '2021-05-12',
//         image: 'images/coding-event.jpg',
//         isFeatured: false,
//     },
//     {
//         id: 'e2',
//         title: 'Networking for introverts',
//         description:
//             "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
//         location: 'New Wall Street 5, 98765 New Work',
//         date: '2021-05-30',
//         image: 'images/networking-introverts.jpg',
//         isFeatured: true,
//     },
//     {
//         id: 'e3',
//         title: 'Networking for extroverts',
//         description:
//             'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
//         location: 'My Street 12, 10115 Broke City',
//         date: '2022-04-10',
//         image: 'images/networking-extroverts.jpg',
//         isFeatured: true,
//     },
// ];

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents()
    return allEvents.filter((event) => event.isFeatured);
}

export async function getAllEvents() {

    const response = await fetch('https://nextjs--course-default-rtdb.firebaseio.com/events.json')
    const data = await response.json()

    const transformedData = []
    for( const key in data) {
        transformedData.push({
            id: data[key].id,
            title: data[key].title,
            description: data[key].description,
            location: data[key].location,
            date: data[key].date,
            image: data[key].image,
            isFeatured: data[key].isFeatured
        })
    }

    return transformedData;
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents()

    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}

export async function getEventById(id) {
    const allEvents = await getAllEvents()
    return allEvents.find((event) => event.id === id);
}