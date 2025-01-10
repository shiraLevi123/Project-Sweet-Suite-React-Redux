import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuitDisplay from './components/SuiteDisplay';
import SuitesSearch from './components/SuitesSearch';
import DiaryForm from './components/DiaryForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Pay from './components/Pay';
import ProtectedRoute from './components/ProtectedRoute';
import ThankYou from './components/ThankYou';
import Comment from './components/Comment';
import About from './components/About';
import AddSuite from './components/AddSuite';
import Diaries from './components/Diaries';
import UpdateCustomer from './components/UpdateCustomer';
import { Box, Typography } from '@mui/material';

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
        <Route path="/diary-form/:suiteId" element={<ProtectedRoute><DiaryForm /></ProtectedRoute>} />
        <Route path="/pay" element={<ProtectedRoute><Pay /></ProtectedRoute>} />
        <Route path="/thank-you" element={<ProtectedRoute><ThankYou /></ProtectedRoute>} />
        <Route path="/comment" element={<ProtectedRoute><Comment /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/add-suite" element={<AddSuite />} />
        <Route path="/diaries" element={<Diaries/>} />
        <Route path="/update-customer" element={<UpdateCustomer/>} />

      </Routes>
      <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw', // משתנה ל-100vw כדי להבטיח שה-footer יתפוס את כל רוחב המסך
        backgroundColor: '#f1f1f1',
        padding: '10px',
        textAlign: 'center',
        boxShadow: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        🍭© {new Date().getFullYear()} כל הזכויות שמורות
      </Typography>
    </Box>
    </Router>
  );
};

export default App;

