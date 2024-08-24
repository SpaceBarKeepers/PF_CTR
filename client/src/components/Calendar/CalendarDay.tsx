import "./calendarDay.scss"

type Props = {
    label: string;
    isWeekend?: boolean;
    hasEvent?: boolean;
}

const CalendarDay = ({ label, isWeekend = false, hasEvent = false }: Props) => {
    return (
        <div className={`calendarDay${isWeekend ? " calendarDay--weekend" : ""}${hasEvent ? " calendarDay--hasEvent" : ""}`}>
            {label}
        </div>
    );
}

export default CalendarDay;