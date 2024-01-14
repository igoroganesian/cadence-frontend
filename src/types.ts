export type Habit = {
  id: number;
  name: string;
  color: string;
  activityLog: string[];
};

export type HabitLogProps = {
  habitId: number;
  habitName: string;
  habitColor: string;
  activityLog: string[];
};

export type HabitListProps = {
  habits: Habit[];
  onCreateHabit?: (newHabitData: Omit<Habit, 'id'>) => void;
};

export interface HabitFormProps {
  onCreateHabit?: (habit: Omit<Habit, 'id'>) => void;
  onEditHabit?: (habit: Habit) => void;
  onDeleteHabit?: (habit: Habit) => void;
  editingHabit?: Habit;
  style?: React.CSSProperties;
}

export interface ColorPaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}