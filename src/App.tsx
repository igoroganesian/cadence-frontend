import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HabitList from "./components/HabitList";
import HabitForm from "./components/HabitForm";

type Habit = {
  id: number;
  name: string;
  color: string;
  activityLog: string[];
};

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    fetch('/api/habits')
      .then(response => response.json())
      .then(data => setHabits(data))
      .catch(error => console.error('Error fetching habits:', error));
  }, []);

  const onCreateHabit = (newHabitData: Omit<Habit, 'id'>) => {
    fetch('/api/habits', {
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
