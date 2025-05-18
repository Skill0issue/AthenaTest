import './App.css'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard'


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/*" element={<div> ERROR 404 : Notfound</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
