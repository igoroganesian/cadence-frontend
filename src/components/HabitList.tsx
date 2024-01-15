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
            <button
                onClick={() => setShowForm(prevVisible => !prevVisible)}
                className="form-toggle-button"
            >
                {showForm ? 'Close' : 'Create Habit'}
            </button>
            {showForm && (
                <HabitForm
                    onCreateHabit={handleCreateHabit}
                    onEditHabit={onEditHabit}
                    onDeleteHabit={onDeleteHabit}
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