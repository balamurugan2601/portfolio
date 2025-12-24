import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';
import InteractiveBackground from './components/InteractiveBackground';

function App() {
    return (
        <div className="min-h-screen">
            <InteractiveBackground />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
            </Routes>
        </div>
    );
}

export default App;
