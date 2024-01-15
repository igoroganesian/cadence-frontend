import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchHabits, createHabit } from "./api/api";
import { Habit } from "./types";
import HabitList from "./components/HabitList";

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    fetchHabits()
      .then(response => {
        setHabits(response.data);
      })
      .catch(error => console.error('Error fetching habits:', error));
  }, []);

  const onCreateHabit = (newHabitData: Omit<Habit, 'id'>) => {
    createHabit(newHabitData)
      .then(response => {
        setHabits(prevHabits => [...prevHabits, response.data]);
      })
      .catch(error => console.error('Error creating habit:', error));
  };

  const onEditHabit = (updatedHabit: Habit) => {
    setHabits(currentHabits =>
      currentHabits.map(habit =>
        habit.id === updatedHabit.id ? updatedHabit : habit)
    );
  };

  const onDeleteHabit = (deletedHabitId: number) => {
    setHabits(habits => habits.filter(habit => habit.id !== deletedHabitId));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HabitList
              habits={habits}
              onCreateHabit={onCreateHabit}
              onEditHabit={onEditHabit}
              onDeleteHabit={onDeleteHabit}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;