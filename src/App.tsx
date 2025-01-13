import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartingPage from './pages/StartingPage'
import Quiz from "./pages/Quiz";
import './index.css'
function App() {

  return (
    <BrowserRouter basename="https://Poleron402.github.io/civics">
      <Routes>
        <Route path="/" element={<StartingPage/>}/>
        <Route path="quiz/:state/" element={<Quiz/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
