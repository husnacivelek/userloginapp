import React, {Fragment} from "react";

const HomePage = ({ setAuth }) => {
    const logout = () => {
        localStorage.removeItem("token");  
        setAuth(false);
    };

    return (
        <Fragment>
            <h1>Home</h1>
            <button onClick={logout}>Logout</button>
        </Fragment>
    );
};

export default HomePage;
