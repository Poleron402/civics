import { HashRouter, Routes, Route } from "react-router-dom";
import StartingPage from './pages/StartingPage'
import Quiz from "./pages/Quiz";
import './index.css'
function App() {
  return (
    // <HashRouter >
      <Routes>
        <Route path="/civics/" element={<StartingPage/>}/>
        <Route path="/civics/quiz/:state/" element={<Quiz/>}/>
      </Routes>
    // </HashRouter>
  )
}

export default App
