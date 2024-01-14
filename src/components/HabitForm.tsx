import { useEffect, useState } from "react";
import { Habit } from '../types';
import ColorPalette from "./ColorPalette";
import "./HabitForm.css";

// Omit: expects a Habit with every property but id
// void: onCreateHabit doesn't return anything
const HabitForm = ({ onCreateHabit, onEditHabit, editingHabit }: {
    onCreateHabit: (habit: Omit<Habit, 'id'>) => void;
    onEditHabit?: (habit: Habit) => void;
    editingHabit?: Habit;
}) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#c6c6c6");

    useEffect(() => {
        if (editingHabit) {
            setName(editingHabit.name);
            setColor(editingHabit.color);
        } else {
            setName("");
            setColor("#636363");
        }
    }, [editingHabit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const habitData = { name, color };

        if (editingHabit) {
            onEditHabit?.({ ...editingHabit, ...habitData });
        } else {
            onCreateHabit({ ...habitData, activityLog: [] });
        }
    };

    return (
        <form
            className="habit-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <ColorPalette
                selectedColor={color}
                onSelectColor={setColor}
            />
            <button type="submit">
                {editingHabit ? 'Edit Habit' : "Add Habit"}
            </button>
        </form>
    );
};

export default HabitForm;