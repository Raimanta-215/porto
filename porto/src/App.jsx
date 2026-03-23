import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CyberPortfolio from './components/ActivityCard';
import ActivityDetail from './components/ActivityDetail'; // On va le créer après

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CyberPortfolio />} />
        <Route path="/activite/:id" element={<ActivityDetail />} />
      </Routes>
    </Router>
  );
}

export default App;