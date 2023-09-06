import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/home';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
