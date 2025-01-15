import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import StartingPage from './pages/StartingPage'
import Quiz from "./pages/Quiz";
import './index.css'
function App() {
  useEffect(() => {
    document.title = 'Civics Quiz App'; // Set the title dynamically
  }, []); 
  return (
      <Routes>
        <Route path="/" element={<StartingPage/>}/>
        <Route path="/quiz/:state/" element={<Quiz/>}/>
      </Routes>
  )
}

export default App
