import React from "react";
import "../SearchBar/SearchBar.css";
import "./Login.css";

const Login = (props) => {
    if (window.localStorage.getItem('accessToken')) {
        return <div/>;
    } else {
        return (
            <div className="Login">
                <button className="SearchButton" onClick={props.onClick}>Login</button>
            </div>
        );
    }
}

export default Login;