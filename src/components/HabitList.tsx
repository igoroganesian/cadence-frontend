import { Habit } from '../types';
import HabitLog from "./HabitLog";
import HabitForm from "./HabitForm";
import './HabitList.css';

type HabitListProps = {
    habits: Habit[];
    onCreateHabit: (newHabitData: Omit<Habit, 'id'>) => void;
};

const HabitList = ({habits, onCreateHabit }: HabitListProps) => {
    return (
        <div className='habit-list'>
            <HabitForm onCreateHabit={onCreateHabit} />
            {habits.map(habit => (
                <HabitLog key={habit.id} habitName={habit.name} habitColor={habit.color} activityLog={habit.activityLog} />
            ))}
        </div>
    );
};

export default HabitList;