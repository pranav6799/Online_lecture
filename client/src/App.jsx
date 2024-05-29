import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import StartPage from './components/StartPage';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import InstructorDashboard from './components/InstructorDashborard';
import Courses from './components/Courses';
import AddLecture from './components/AddLecture';
import InstructorLectures from './components/InstructorLectures';
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
