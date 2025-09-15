import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiseaseListPage from './components/DiseaseListPage';
import DiseaseUploadPage from './components/DiseaseUploadPage';
import ResultsPage from './components/ResultsPage';
import WelcomePage from './components/WelcomePage'; // Assuming you have this

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/diseases" element={<DiseaseListPage />} />
                <Route path="/upload/:diseaseName" element={<DiseaseUploadPage />} />
                <Route path="/results/:diseaseName" element={<ResultsPage />} />
            </Routes>
        </Router>
    );
}

export default App;