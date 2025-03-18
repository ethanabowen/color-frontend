import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { ColorForm } from './components/ColorForm';
import { SearchColors } from './components/SearchColors';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mx-auto max-w-3xl">
              <Routes>
                <Route path="/" element={<ColorForm />} />
                <Route path="/search" element={<SearchColors />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
