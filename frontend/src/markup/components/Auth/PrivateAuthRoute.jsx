//Import React, useState and useEffect
import React, { useState, useEffect } from "react";
//Import the Route and Navigate components
import { Navigate } from "react-router-dom";
//Import the util function we created to the handle the reading from the local storage
import getAuth from "../../../util/auth";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    //Retrieve the logged in user from the local storage
    const loggedInEmployee = getAuth();
    // console.log(loggedInEmployee)
    loggedInEmployee.then((response) => {
      console.log(response)
      if (response.employee_token) {
        //If in here , that means the user is logged in
        // console.log('set logged in to the true')
        setIsLogged(true);
        if (
          roles &&
          roles.length > 0 &&
          roles.includes(response.employee_role)
        ) {
          //If in here, that means the user is logged in and has authorization to access the route
          // console.log('set authorized to the true')
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [roles]);
  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }
  return children;
};

export default PrivateAuthRoute;
