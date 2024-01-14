import HabitLog from "./HabitLog";
import HabitForm from "./HabitForm";
import { HabitListProps } from '../types';
import './HabitList.css';

const HabitList = ({ habits, onCreateHabit, onDeleteHabit }: HabitListProps) => {

    return (
        <div className='habit-list'>
            <HabitForm
                onCreateHabit={onCreateHabit}
                onDeleteHabit={onDeleteHabit}
            />
            {habits.map(habit => (
                <HabitLog
                    key={habit.id}
                    habitId={habit.id}
                    habitName={habit.name}
                    habitColor={habit.color}
                    activityLog={habit.activityLog}
                    onDeleteHabit={onDeleteHabit}
                />
            ))}
        </div>
    );
};

export default HabitList;