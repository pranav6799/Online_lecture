import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import StartPage from './Components/StartPage';
import Register from './Components/Register';
import AdminDashboard from './Components/AdminDashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import InstructorDashboard from './Components/InstructorDashborard';
import Courses from './Components/Courses';
import AddLecture from './Components/AddLecture';
import InstructorLectures from './Components/InstructorLectures';
import AdminRoute from './Routes/AdminPrivate';


function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/add-lecture/:courseId" element={<AdminRoute />}>
        <Route path="" element={<AddLecture />} />
      </Route>
      <Route path="/lectures/:instructorId" element={<AdminRoute />}>
        <Route path="" element={<InstructorLectures />} />
      </Route>
      <Route path='/user'>
      <Route path="" element={<InstructorDashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="" element={<AdminDashboard />} />
      </Route>
    </Routes>

      
    </>
  )
}

export default App
