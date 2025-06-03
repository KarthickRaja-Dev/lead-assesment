import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LeadForm from './components/LeadForm';
import LeadDashboard from './components/LeadDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Lead Management System</h1>
            <div className="flex justify-center space-x-8">
              <Link
                to="/"
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Lead Form
              </Link>
              <Link
                to="/dashboard"
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<LeadForm />} />
            <Route path="/dashboard" element={<LeadDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
