import { useState } from "react";
import { Habit } from '../types';

// Omit: expects a Habit with every property but id
// void: onCreateHabit doesn't return anything
const HabitForm = ({ onCreateHabit }: { onCreateHabit: (habit: Omit<Habit, 'id'>) => void; }) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#000000");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onCreateHabit({ name, color, activityLog: [] });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Habit name"
                required
            />
            <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <button type="submit">Create Habit</button>
        </form>
    );
};

export default HabitForm;