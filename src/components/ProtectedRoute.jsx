import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // בדיקה אם יש משתמש מחובר (למשל, אם יש מידע ב-state)
    const currentCustomer = useSelector((state) => state.customer.currentCustomer);

    // אם אין משתמש מחובר, נווט לדף התחברות
    if (!currentCustomer || !currentCustomer.id) {
        return <Navigate to="/login" />;
    }

    // אם יש משתמש מחובר, הצג את הדפים המבוקשים
    return children;
};

export default ProtectedRoute;
