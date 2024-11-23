import React from "react";
import { useSelector } from "react-redux";

function HomePage() {
    const user = useSelector((state) => state.user.currenUser)
    return (
        <div>
            <h1>hello{user?.name}</h1>
        </div>
    )
}
export default HomePage;