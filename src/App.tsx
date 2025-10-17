import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<AllProjects />} />
            </Routes>
            <Footer />
            <AIAssistant />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
