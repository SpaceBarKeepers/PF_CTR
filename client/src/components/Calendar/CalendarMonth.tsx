import { EventEntity } from '../../models/entities';
import { useCallback, useEffect, useState } from 'react';
import CalendarDay from './CalendarDay';
import './calendarMonth.scss';
import { getMonthName } from '../../lib/getMonthName';

type Props = {
    month: number;
    year: number;
    events: EventEntity[];
    selected?: boolean;
    onClick?: () => void;
}

const CalendarMonth = ({ month, year, events, selected = false, onClick }: Props) => {
    const [weekArray, setWeekArray] = useState<Date[][]>([]);

    useEffect(() => {
        const generateWeeksArray = () => {
            const weeks = [];
            let week = [];

            // Start from the first day of the month
            let date = new Date(year, month - 1, 1);

            // Calculate the day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
            const firstDayOfWeek = date.getDay();

            // Calculate the offset to adjust the start of the month to Monday
            const offset = (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1);

            // Fill in the days from the previous month
            if (offset > 0) {
                for (let i = offset; i > 0; i--) {
                    const prevMonthDate = new Date(year, month, -i);
                    week.push(prevMonthDate);
                    prevMonthDate.setDate(prevMonthDate.getDate() + 1);
                }
            }

            // Add days of the current month
            while (date.getMonth() === month - 1) {
                week.push(new Date(date)); // Add the current day to the week

                // If it's Sunday, push the current week to weeks array and start a new week
                if (date.getDay() === 0) {
                    weeks.push(week);
                    week = [];
                }

                // Move to the next day
                date.setDate(date.getDate() + 1);
            }

            // Fill in the remaining days of the week after the month ends
            let nextMonthDay = 1
            while (week.length < 7 && week.length > 0) {
                const nextMonthDate = new Date(year, month + 1, nextMonthDay);
                week.push(nextMonthDate);
                nextMonthDay++
            }

            // Push the last week (even if it is incomplete) to weeks array
            if (week.length > 0) {
                weeks.push(week);
            }

            return weeks;
        };

        setWeekArray(generateWeeksArray());
    }, [month, year]);

    return (
        <div className={'calendarMonth'} {...{onClick}}>
            <div className={`calendarMonth__name${selected ? " calendarMonth__name--selected" : ""}`}>{getMonthName(month)}</div>
            <div className={'calendarMonth__weeks'}>
                <div className={'calendarMonth__weeksWeek'}>
                    <CalendarDay label={'Mon'} />
                    <CalendarDay label={'Tue'} />
                    <CalendarDay label={'Wed'} />
                    <CalendarDay label={'Thu'} />
                    <CalendarDay label={'Fri'} />
                    <CalendarDay label={'Sat'} isWeekend={true} />
                    <CalendarDay label={'Sun'} isWeekend={true} />
                </div>
                {weekArray.map((week, index) => (
                    <div key={index} className={'calendarMonth__weeksWeek'}>
                        {week.map((date: Date, dateIndex) => (
                            <CalendarDay
                                key={index + dateIndex}
                                label={date.getDate().toString()}
                                isWeekend={dateIndex >= 5}
                                hasEvent={events.some((event) => new Date(event.eventAt).toDateString() === date.toDateString())}
                            />
                                ))}
                            </div>
                        ))}
                    </div>
                    </div>
                    )
                }

                export default CalendarMonth;