import React from 'react';
import { useSelector } from "react-redux";
import './Welcome.css';

const Welcome = () => {
    const { currentCustomer } = useSelector((state) => state.customer);

    return (
        <div dir='rtl' className="welcome-container">
            {currentCustomer ? (
                <>
                    <h1>{currentCustomer.name}, ברוך הבא</h1>
                    <h1>🍭Sweet Suite</h1>
                </>
            ) : (
                <h1>🍭Sweet Suite</h1>
            )}

<br></br>
            <h2>האתר הגדול ביותר להשכרת סוויטות במרכז !</h2>
            <br></br>
            <h2>מצאו את היעד הבא לחופש שלכם</h2>

        </div>
    );
};

export default Welcome;