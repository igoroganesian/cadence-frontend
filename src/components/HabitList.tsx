import { useState } from "react";
import HabitLog from "./HabitLog";
import HabitForm from "./HabitForm";
import { Habit, HabitListProps } from '../types';
import './HabitList.css';

const HabitList = ({ habits, onCreateHabit, onEditHabit, onDeleteHabit }: HabitListProps) => {
    const [showForm, setShowForm] = useState(false);

    const handleCreateHabit = (newHabitData: Omit<Habit, 'id'>) => {
        if (onCreateHabit) {
            onCreateHabit(newHabitData);
            setShowForm(false);
        }
    };

    return (
        <div className='habit-list'>
            <div className="habit-list-head">
            <button
                onClick={() => setShowForm(prevVisible => !prevVisible)}
                className="form-toggle-button"
            >
                {showForm ? <i className="fa fa-minus"></i> : <i className="fa fa-plus"></i>}
            </button>
            </div>
            <div className={showForm ? "overlay show" : "overlay"}
                onClick={() => setShowForm(false)}
            >
            </div>
            {showForm && (
                <HabitForm
                    onCreateHabit={handleCreateHabit}
                    onEditHabit={onEditHabit}
                    onDeleteHabit={onDeleteHabit}
                    onClose={() => setShowForm(false)}
                />
            )}
            {habits.map(habit => (
                <HabitLog
                    key={habit.id}
                    habitId={habit.id}
                    habitName={habit.name}
                    habitColor={habit.color}
                    activityLog={habit.activityLog}
                    onEditHabit={onEditHabit}
                    onDeleteHabit={onDeleteHabit}
                />
            ))}
        </div>
    );
};

export default HabitList;