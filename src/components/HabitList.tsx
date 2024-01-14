import HabitLog from "./HabitLog";
import HabitForm from "./HabitForm";
import { HabitListProps } from '../types';
import './HabitList.css';

const HabitList = ({habits, onCreateHabit }: HabitListProps) => {

    return (
        <div className='habit-list'>
            {/* <HabitForm onCreateHabit={onCreateHabit} /> */}
            {habits.map(habit => (
                <HabitLog
                    key={habit.id}
                    habitId={habit.id}
                    habitName={habit.name}
                    habitColor={habit.color}
                    activityLog={habit.activityLog}
                />
            ))}
        </div>
    );
};

export default HabitList;