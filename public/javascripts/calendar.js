const Calendar = tui.Calendar;

const calendar = new Calendar('#calendar', {
    usageStatistics: false,
    defaultView: 'month',
});

calendar.createEvents([
    {
        id: 'event1',
        calendarId: 'cal2',
        title: 'Weekly meeting',
        start: '2022-07-01T09:00:00',
        end: '2022-07-04T10:00:00',
        color: '#000000',
        backgroundColor: '#00b4d8',
        dragBackgroundColor: '#00b4d8',
        borderColor: '#f72585',
    },
    {
        id: 'event2',
        calendarId: 'cal1',
        title: 'Lunch appointment',
        start: '2022-07-10T12:00:00',
        end: '2022-07-13T13:00:00',
        color: '#000000',
        backgroundColor: '#00b4d8',
        dragBackgroundColor: '#00b4d8',
        borderColor: '#f72585',
    },
    {
        id: 'event3',
        calendarId: 'cal2',
        title: 'Vacation',
        start: '2022-07-17',
        end: '2022-07-18',
        isAllday: true,
        category: 'allday',
        color: '#000000',
        backgroundColor: '#00b4d8',
        dragBackgroundColor: '#00b4d8',
        borderColor: '#f72585',
    },
]);

// Calendar Options
calendar.setOptions({
    useFormPopup: true,
    useDetailPopup: true,
    isReadOnly: false
});

/********************** CRUD FOR EVENTS ************************/
// Create Event
calendar.on('beforeCreateEvent', (eventObj) => {
    calendar.createEvents([
        {
            color: '#000000',
            backgroundColor: '#00b4d8',
            dragBackgroundColor: '#00b4d8',
            borderColor: '#f72585',
            ...eventObj,
            id:'3',
        }
    ]);
});

// Update Event
calendar.on('beforeUpdateEvent', ({ event, changes }) => {
    calendar.updateEvent(event.id, event.calendarId, changes);
});

// Delete Event
calendar.on('beforeDeleteEvent', (eventObj) => {
    calendar.deleteEvent(eventObj.id, eventObj.calendarId);
});

/******************** DATE HEADER DISPLAY ************************/
const date = document.getElementById('date');
let now = new Date();
let monthVar = now.getMonth();
let yearVar = now.getFullYear();

const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'
];

date.textContent = months[monthVar] + ' ' + yearVar;

// Function To Set Header Date Text
const setDate = (forward) => {
    if (forward) {
        now.setMonth(now.getMonth() + 1);
        monthVar = now.getMonth();
        if (monthVar === 0) {
            now.setFullYear(now.getFullYear());
            yearVar = now.getFullYear();
        }
        date.textContent = months[monthVar] + ' ' + yearVar;
    } else {
        now.setMonth(now.getMonth() - 1);
        monthVar = now.getMonth();
        if (monthVar === 11) {
            now.setFullYear(now.getFullYear());
            yearVar = now.getFullYear();
        }
        console.log(monthVar);
        date.textContent = months[monthVar] + ' ' + yearVar;
    }
};

/********************** CALENDAR NAVIGATION **********************/
// Navigate Backward
const prev = document.getElementById('prev');
prev.addEventListener('click', () => {
    calendar.move(-1);
    setDate(false);
});

// Navigate Forward
const next = document.getElementById('next');
next.addEventListener('click', () => {
    calendar.move(1);
    setDate(true);
});

/*********************** CALENDAR VIEW ***************************/
// Day View
const day = document.getElementById('day');
day.addEventListener('click', () => {
    calendar.changeView('day');
});

// Week View
const week = document.getElementById('week');
week.addEventListener('click', () => {
    calendar.changeView('week');
});

// Month View
const month = document.getElementById('month');
month.addEventListener('click', () => {
    calendar.changeView('month');
});

