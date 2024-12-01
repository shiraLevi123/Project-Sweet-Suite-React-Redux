import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuitDisplay from './components/SuiteDisplay';
import SuitesSearch from './components/SuitesSearch';
import DiaryForm from './components/DiaryForm';
// import Pay from './components/Pay';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Welcome from './components/Welcom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Pay from './components/Pay';
import ProtectedRoute from './components/ProtectedRoute';
// import { Link } from 'react-router-dom';
import ThankYou from './components/ThankYou';  // הקומפוננטה שתציג את הודעת התודה

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/suitDisplay" element={<SuitDisplay />} />
        <Route path="/suitesSearch" element={<SuitesSearch />} />
        <Route path="/diary-form/:suiteId" element={<DiaryForm />} />
        <Route path="/pay" element={<ProtectedRoute><Pay /></ProtectedRoute>} />
        <Route path="/thank-you" element={<ThankYou />} />

      </Routes>
    </Router>
  );
};

export default App;

