import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-black to-fuchsia-950 text-slate-100">
        <nav className="px-6 py-4 bg-slate-950/70 backdrop-blur border-b border-slate-800 flex gap-6">
          <Link 
            to="/login" 
            className="text-sm text-slate-100 hover:text-fuchsia-300 transition"
          >
            Login
          </Link>

          <Link 
            to="/register" 
            className="text-sm text-slate-100 hover:text-fuchsia-300 transition"
          >
            Register
          </Link>
        </nav>

        <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
