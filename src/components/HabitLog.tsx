import { useState } from 'react';
import "./HabitLog.css";

type HabitLogProps = {
    habitName: string;
    activityLog: string[];
};

const HabitLog = ({ habitName, activityLog }: HabitLogProps) => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const [activityData, setActivityData] = useState<string[]>([]);

    const toggleActivity = (date: string) => {
        setActivityData(prevActivityData =>
            prevActivityData.includes(date) ? prevActivityData.filter(d => d !== date) : [...prevActivityData, date]
        );
        console.log(date);
    };

    const getCellColor = (isActivityDone: boolean): string => {
        return isActivityDone ? '#8b77df' : '#ebedf0';
    };

    const generateCalendar = () => {
        const startDate = new Date(previousYear, 0, 1);
        const endDate = new Date(currentYear, 11, 31);
        const yearStart = new Date(currentYear, 0, 1);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const daysArray = [];

        for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
            /** Up to and including today's date */
            if (day > today) {
                break;
            }
            const formattedDate = day.toISOString().split('T')[0];
            daysArray.push({
                date: formattedDate,
                isToday: day.getTime() === today.getTime(),
                isLastYear: day < yearStart,
                isActivityDone: activityData.includes(formattedDate),
            });
        }

        return daysArray;
    };

    //TODO: swap out hardcoding
    return (
        <div className="habitlog">
            <div className="habitlog-head">
                <h2 className="habitlog-title">Drawing</h2>
                <button><i className="fa fa-plus"></i></button>
            </div>
            <div className="habitlog-calendar">
                {generateCalendar().map((day, i) => (
                    <div
                        key={i}
                        className={`day ${day.isToday ? 'today' : ''} ${day.isLastYear ? 'lastYear' : ''}`}
                        style={{ backgroundColor: getCellColor(day.isActivityDone) }}
                        onClick={() => toggleActivity(day.date)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HabitLog;