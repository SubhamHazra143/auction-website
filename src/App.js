import Login from './Login'
import Buy from './Buy'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Buy' element={<Buy />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
