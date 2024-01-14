import axios from "axios";
import { Habit, NewHabitData } from "../types";

const BASE_URL = process.env.REACT_APP_API_URL;

// Fetch all habits
export const fetchHabits = () => {
  return axios.get(`${BASE_URL}/api/habits`);
}

// Create a new habit
export const createHabit = (newHabitData: NewHabitData) => {
  return axios.post(`${BASE_URL}/api/habits`, newHabitData);
}

// Update an existing habit
export const updateHabit = (updatedHabit: Habit) => {
  return axios.patch(`${BASE_URL}/api/habits/${updatedHabit.id}`, updatedHabit);
}

// Delete an existing habit
export const deleteHabit = (habitId: number) => {
  return axios.delete(`${BASE_URL}/api/habits/${habitId}`);
}