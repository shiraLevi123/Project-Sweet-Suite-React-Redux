import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../slice/customerSlice";
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = { name, email, password };

    try {
      // שליחת נתונים ל-Redux (ובסיס נתונים)
      await dispatch(signUp(customerData));
      navigate('/login'); // לאחר הרשמה, נווט לעמוד ה-login
    } catch (error) {
      alert("There was an error during sign up");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // כאן מחברים את השדה לסטייט
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // כאן מחברים את השדה לסטייט
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // כאן מחברים את השדה לסטייט
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
