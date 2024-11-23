import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuitDisplay from './components/SuiteDisplay';
import SuitesSearch from './components/SuitesSearch';
import DiaryForm from './components/DiaryForm';
import Pay from './components/Pay';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Welcome from './components/Welcom';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">suites-search</Link></li>
            <li><Link to="/suite=display">SuitDisplay</Link></li>
            <li><Link to="/signup">signUp</Link></li>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/welcome">welcome</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<SuitesSearch />} />
          <Route path="/suite=display" element={<SuitDisplay />} />
          <Route path="/diary-form/:suiteId" element={<DiaryForm />} />
          <Route path="pay" element={<Pay />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

