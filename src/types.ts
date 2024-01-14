export type Habit = {
  id: number;
  name: string;
  color: string;
  activityLog: string[];
};

export type HabitLogProps = {
  habitName: string;
  habitColor: string;
  activityLog: string[];
};

export type HabitListProps = {
  habits: Habit[];
  onCreateHabit: (newHabitData: Omit<Habit, 'id'>) => void;
};