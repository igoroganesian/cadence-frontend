import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Habit } from "./types";
import HabitList from "./components/HabitList";

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/habits`)
      .then(response => {
        setHabits(response.data);
      })
      .catch(error => console.error('Error fetching habits:', error));
  }, []);

  const onCreateHabit = (newHabitData: Omit<Habit, 'id'>) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/habits`, newHabitData)
      .then(response => {
        setHabits(prevHabits => [...prevHabits, response.data]);
      })
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
