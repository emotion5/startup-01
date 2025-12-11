import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ExhibitionPage from './pages/ExhibitionPage';
import { WorkHubMain } from './modules/workhub';
import BranchView from './modules/workhub/pages/BranchView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/exhibition/:id" element={<ExhibitionPage />} />

        {/* WorkHub Routes */}
        <Route path="/workhub" element={<WorkHubMain />} />
        <Route path="/project/:projectId/workhub" element={<WorkHubMain />} />
        <Route path="/workhub/branch/:branchId" element={<BranchView />} />
      </Routes>
    </Router>
  );
}

export default App;
