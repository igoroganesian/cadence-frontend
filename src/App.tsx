import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Habit } from "./types";
import HabitList from "./components/HabitList";
import ColorPalette from "./components/ColorPalette";

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/habits`)
      .then(response => response.json())
      .then(data => setHabits(data))
      .catch(error => console.error('Error fetching habits:', error));
  }, []);

  const onCreateHabit = (newHabitData: Omit<Habit, 'id'>) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/habits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHabitData),
    })
        .then(response => response.json())
        .then(newHabit => setHabits(prevHabits => [...prevHabits, newHabit]))
        .catch(error => console.error('Error creating habit:', error));
};

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HabitList habits={habits} onCreateHabit={onCreateHabit} />} />
      </Routes>
    </Router>
  );
}

export default App;
