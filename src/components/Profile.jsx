import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const { currentCustomer } = useSelector((state) => state.customer);

    // אם אין משתמש מחובר, אפשר להציג הודעה מתאימה או לנתב לעמוד אחר
    if (!currentCustomer) {
        return <p>You are not logged in. Please log in to view your profile.</p>;
    }

    return (
        <div>
            <h1>Profile</h1>
            {/* <p><strong>Username:</strong> {currentCustomer.email}</p> */}
            <p><strong>NAME:</strong> {currentCustomer.name}</p>
            <p><strong>EMAIL:</strong> {currentCustomer.email}</p>
        </div>
    );
};

export default Profile;
