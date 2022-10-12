import React from "react";
import { Navigate } from "react-router-dom";
                    // true //false
                    //IF THE ISLOGGININ IS TRUE THEN IT WILL NOT NAVIGATE TO HOME
                    //IF THE ISLOGGENIN IS FALSE THEN IT WILL GO TO THE HOME
const Protected = ({ isLoggedIn, children }) => {
 if (!isLoggedIn) { //false   //true
 return <Navigate to="/" replace/>; //means if we want to go to profile then we have to be logged in
 }
 return children;
};
export default Protected;