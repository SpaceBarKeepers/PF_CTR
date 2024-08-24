import { EventEntity } from '../../models/entities';
import { useCallback, useEffect, useState } from 'react';
import { getEventsAll } from '../../api/events';
import CalendarMonth from './CalendarMonth';
import './calendar.scss';
import { getMonthName } from '../../lib/getMonthName';

const Calendar = () => {
    const [events, setEvents] = useState<EventEntity[]>([]);
    const [firstEvent, setFirstEvent] = useState<number[]>([]);
    const [monthArray, setMonthArray] = useState<number[][]>([]);

    const findRelevantMonth = useCallback((events: EventEntity[]) => {
        if (!events.length) return;
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed
        const currentYear = now.getFullYear();

        // Filter events by year and month
        const groupedEvents = events.reduce((acc, event) => {
            const eventDate = new Date(event.eventAt);
            const eventMonth = eventDate.getMonth() + 1;
            const eventYear = eventDate.getFullYear();

            const key = `${eventMonth}-${eventYear}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(event);
            return acc;
        }, {});

        // Check if current month has events
        if (groupedEvents[`${currentMonth}-${currentYear}`]) {
            return [currentMonth, currentYear];
        }

        // Check for closest next month with events
        let nextMonth = currentMonth;
        let nextYear = currentYear;
        while (nextYear <= currentYear + 1) { // Limiting the search to one year ahead
            nextMonth++;
            if (nextMonth > 12) {
                nextMonth = 1;
                nextYear++;
            }

            if (groupedEvents[`${nextMonth}-${nextYear}`]) {
                return [nextMonth, nextYear];
            }
        }

        // Check for closest past month with events
        let pastMonth = currentMonth;
        let pastYear = currentYear;
        while (pastYear >= currentYear - 1) { // Limiting the search to one year back
            pastMonth--;
            if (pastMonth < 1) {
                pastMonth = 12;
                pastYear--;
            }

            if (groupedEvents[`${pastMonth}-${pastYear}`]) {
                return [pastMonth, pastYear];
            }
        }

        // If no events are found, return current month
        return [currentMonth, currentYear];
    }, []);

    const [selectedMonth, setSelectedMonth] = useState<number[]>();

    const generateCalendar = useCallback(() => {
        const [firstMonth, firstYear] = firstEvent;

        // Helper function to get the current date in month and year format
        function getCurrentMonthYear() {
            const now = new Date();
            return [now.getMonth() + 1, now.getFullYear()]; // Months are 0-based in JS Date object
        }

        // Helper function to add months to a date
        function addMonths(month, year, numMonths) {
            const date = new Date(year, month - 1); // JS months are 0-based
            date.setMonth(date.getMonth() + numMonths);
            return [date.getMonth() + 1, date.getFullYear()]; // Return as [month, year]
        }

        // Helper function to generate the range of months
        function generateMonths(startMonth, startYear, endMonth, endYear) {
            const months = [];
            let [currentMonth, currentYear] = [startMonth, startYear];
            while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
                months.push([currentMonth, currentYear]);
                [currentMonth, currentYear] = addMonths(currentMonth, currentYear, 1);
            }
            return months;
        }

        const [currentMonth, currentYear] = getCurrentMonthYear();
        const sixMonthsAgo = addMonths(currentMonth, currentYear, -6);

        // Determine the start and end months based on the rules
        let startMonth, startYear, endMonth, endYear;
        if (firstYear < sixMonthsAgo[1] || (firstYear === sixMonthsAgo[1] && firstMonth <= sixMonthsAgo[0])) {
            // First event is older than 6 months ago
            [startMonth, startYear] = sixMonthsAgo;
            [endMonth, endYear] = addMonths(currentMonth, currentYear, 6);
        } else {
            // First event is within the last 6 months
            [startMonth, startYear] = [firstMonth, firstYear];
            [endMonth, endYear] = addMonths(firstMonth, firstYear, 11); // 12 months total
        }

        // Generate the calendar array
        return generateMonths(startMonth, startYear, endMonth, endYear);
    }, [firstEvent]);

    useEffect(() => {
        getEventsAll()
            .then((response) => {
                const onlyEnglishEvents = response.filter((event: EventEntity) => event.publishedEn);
                setEvents(onlyEnglishEvents);
                setFirstEvent(() => {
                    const firstEvent = onlyEnglishEvents.sort((a: EventEntity, b: EventEntity) => new Date(a.eventAt).getTime() - new Date(b.eventAt).getTime())[0];
                    return [new Date(firstEvent.eventAt).getMonth(), new Date(firstEvent.eventAt).getFullYear()];
                });
                setSelectedMonth(findRelevantMonth(onlyEnglishEvents));
            })
            .catch((error) => console.error);
    }, [findRelevantMonth]);

    useEffect(() => {
        if (!firstEvent.length) return;
        setMonthArray(generateCalendar());
    }, [firstEvent, generateCalendar]);

    const handleSelectMonth = (month: number[]) => () => {
        setSelectedMonth(month);
    };

    return (
        <div className={'calendar'}>
            <div className={'calendar__months'}>
                {monthArray.length && monthArray.map((month, index) => {
                    return (
                        <CalendarMonth
                            key={index + month[0] + month[1]}
                            month={month[0]}
                            year={month[1]}
                            events={events.filter(item => {
                                const [eventYear, eventMonth] = item.eventAt.split('-').map(Number);
                                return eventYear === month[1] && eventMonth === month[0];
                            })}
                            selected={selectedMonth && selectedMonth[0] === month[0] && selectedMonth[1] === month[1]}
                            onClick={handleSelectMonth(month)}
                        />
                    );
                })}
            </div>
            <div className={'calendar__events'}>
                {selectedMonth && selectedMonth.length > 0 &&
                    (
                        <>
                            <h3>Events in {getMonthName(selectedMonth[0])}</h3>
                            {events.filter(item => {
                                const [eventYear, eventMonth] = item.eventAt.split('-').map(Number);
                                return eventYear === selectedMonth[1] && eventMonth === selectedMonth[0];
                            }).map((event, index) => (
                                <div key={event.id + index} className={'calendar__eventsEvent'}>
                                    {index !== 0 && <hr />}
                                    <div className={'calendar__eventsEventHead'}>
                                        <p><b>{event.eventAt}</b></p>
                                        <p>{`${event.location || ''}${event.location && event.eventTimeAt ? ", " : ""}${event.eventTimeAt || ''}`}</p>
                                    </div>
                                    <p className={'calendar__eventsEventTitle'}>{event.titleEn}</p>
                                </div>
                            ))
                            }
                        </>
                    )}
            </div>
        </div>
    );
};

export default Calendar;