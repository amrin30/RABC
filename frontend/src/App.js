import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserDetails from './components/UserDetails';
import AdminProfile from './components/AdminProfile';
import UserForm from './components/UserForm';
import Logout from './components/Logout';
import RegisterForm from './components/RegisterForm';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RegisterForm/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/adduser" element={<UserForm />} />
        <Route path="/edituser/:id" element={<UserForm />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
