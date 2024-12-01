import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slice/customerSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, currentCustomer } = useSelector((state) => state.customer);

    const handleLogout = () => {
        dispatch(logout()); 
        navigate("/"); 
    };

    return (
        <nav style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            padding: "1rem", 
            backgroundColor: "#f4f4f4", 
            width: "100%", 
            position: "fixed", 
            top: 0, 
            left: 0, 
            zIndex: 1000 
        }}>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="suitesSearch">Search suites</Link>
            </div>
            <div>
                <Link to="suitDisplay">All suites</Link>
            </div>
            <div>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile">{currentCustomer?.username || "Profile"}</Link>
                        <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>Log Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup" style={{ marginLeft: "1rem" }}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
