import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { WorkoutsContextProvider } from './context/WorkoutContext';

function App() {
  return (
    <div className="App">
      <WorkoutsContextProvider>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </WorkoutsContextProvider>
    </div>
  );
}

export default App;
