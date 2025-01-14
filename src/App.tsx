import { Routes, Route } from "react-router-dom";
import StartingPage from './pages/StartingPage'
import Quiz from "./pages/Quiz";
import './index.css'
function App() {

  return (
      <Routes>
        <Route path="/" element={<StartingPage/>}/>
        <Route path="/quiz/:state/" element={<Quiz/>}/>
      </Routes>
  )
}

export default App
