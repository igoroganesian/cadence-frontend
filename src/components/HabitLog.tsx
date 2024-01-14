import { useState, useEffect } from 'react';
import axios from "axios";
import { Habit, HabitLogProps } from '../types';
import HabitForm from './HabitForm';
import "./HabitLog.css";

const HabitLog = ({ habitId, habitName, habitColor, activityLog, onDeleteHabit }: HabitLogProps) => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const [activityData, setActivityData] = useState<string[]>(activityLog);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setActivityData(activityLog);
    }, [activityLog]);

    const toggleActivity = (date: string) => {
        setActivityData(prevActivityData =>
            prevActivityData.includes(date) ? prevActivityData.filter(d => d !== date) : [...prevActivityData, date]
        );
        console.log(date);
    };

    const getTodaysDate = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getCellColor = (isActivityDone: boolean): string => {
        return isActivityDone ? habitColor : '#ebedf0';
    };

    const generateCalendar = () => {
        const startDate = new Date(previousYear, 0, 1);
        const endDate = new Date(currentYear, 11, 31);
        const yearStart = new Date(currentYear, 0, 1);

        const todayStr = getTodaysDate();

        const daysArray = [];

        /** Up to and including today's date */
        for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
            const formattedDate = day.toISOString().split('T')[0];

            if (formattedDate > todayStr) {
                break;
            }

            daysArray.push({
                date: formattedDate,
                isToday: formattedDate === todayStr,
                isLastYear: day < yearStart,
                isActivityDone: activityData.includes(formattedDate),
            });
        }

        return daysArray;
    };

    const handleEditHabit = () => {
        setIsEditing(false);
    }

    const handleDeleteHabit = async (habitId: number) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/habits/${habitId}`);
            onDeleteHabit(habitId);
        } catch (error) {
            console.error(`Error while deleting habit with ID ${habitId}:`, error);
        }
    }

    //TODO: replace first button with icon
    //TODO: replace title with tooltip span
    return (
        <div className="habit-log">
            <div className="habit-log-head">
                <button
                    style={{ backgroundColor: habitColor }}
                    onClick={() => setIsEditing(true)}
                    ><i className="fa fa-pen"></i>
                </button>
                <h2 className="habit-log-title">{habitName}</h2>
                <button
                    style={{ backgroundColor: habitColor }}
                    onClick={() => toggleActivity(getTodaysDate())}><i className="fa fa-check"></i>
                </button>
            </div>

            {isEditing && (
                <HabitForm
                    editingHabit={{
                        id: habitId,
                        name: habitName,
                        color: habitColor,
                        activityLog: activityLog
                    }}
                    onEditHabit={handleEditHabit}
                    onDeleteHabit={handleDeleteHabit}
                />
            )}

            <div className="habit-log-calendar">
                {generateCalendar().map((day, i) => (
                    <div
                        key={i}
                        className={`day ${day.isToday ? 'today' : ''} ${day.isLastYear ? 'lastYear' : ''}`}
                        style={{ backgroundColor: getCellColor(day.isActivityDone) }}
                        onClick={() => toggleActivity(day.date)}
                        title={day.date}
                    />
                ))}
            </div>
        </div>
    );
};

export default HabitLog;