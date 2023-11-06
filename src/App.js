import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrudApp from './Components/Crud/CrudApp.jsx';
import Login from './Components/Login/Login.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element ={<Login />} />
        <Route path='/crud' element = {<CrudApp />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
