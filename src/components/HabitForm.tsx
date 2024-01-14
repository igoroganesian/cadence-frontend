import { useEffect, useState } from "react";
import ColorPalette from "./ColorPalette";
import { HabitFormProps } from "../types";
import "./HabitForm.css";

const HabitForm = ({ onCreateHabit, onEditHabit, onDeleteHabit, editingHabit }: HabitFormProps) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#c6c6c6");

    useEffect(() => {
        if (editingHabit) {
            console.log(editingHabit.name);
            console.log(editingHabit.color);
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
            onCreateHabit?.({ ...habitData, activityLog: [] });
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
            <div className="button-container">
                <button type="submit">
                    {editingHabit ? 'Edit Habit' : "Add Habit"}
                </button>
                {editingHabit && onDeleteHabit && (
                    <button
                        className="delete-button"
                        onClick={() => onDeleteHabit(editingHabit.id)}
                    >
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
};

export default HabitForm;