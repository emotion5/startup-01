import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ExhibitionPage from './pages/ExhibitionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/exhibition/:id" element={<ExhibitionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
