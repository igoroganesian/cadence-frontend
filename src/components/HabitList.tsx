import { Habit } from '../types';
import HabitLog from "./HabitLog";
import HabitForm from "./HabitForm";

type HabitListProps = {
    habits: Habit[];
    onCreateHabit: (newHabitData: Omit<Habit, 'id'>) => void;
};

const HabitList = ({habits, onCreateHabit }: HabitListProps) => {
    return (
        <div>
            <HabitForm onCreateHabit={onCreateHabit} />
            {habits.map(habit => (
                <HabitLog key={habit.id} habitName={habit.name} activityLog={habit.activityLog} />
            ))}
        </div>
    );
};

export default HabitList;