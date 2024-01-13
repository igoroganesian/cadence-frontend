import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HabitLog from "./components/HabitLog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HabitLog />} />
      </Routes>
    </Router>
  );
}

export default App;
