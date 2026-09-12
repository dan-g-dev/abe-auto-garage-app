//Import React and the Hooks we need here
import React, { useState, useEffect, useContext } from "react";
//Import the Util function we created to handle the reading from the local Storage.
import getAuth from "../util/auth";
//Create a context object
const AuthContext = React.createContext();
//Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

//Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const value = { isLogged, isAdmin, setIsAdmin, setIsLogged, employee };

  console.log(employee);
  useEffect(() => {
    // Retrieve the logged-in user from local storage
    const fetchAuth = async () => {
      const loggedInEmployee = await getAuth().catch(() => null); // Handle errors gracefully
      if (loggedInEmployee && loggedInEmployee.employee_token) {
        setIsLogged(true);
        // Check if the employee is an admin (role === 3)
        if (loggedInEmployee.company_role_id === 3) {
          setIsAdmin(true);
        }
        setEmployee(loggedInEmployee);
      }
    };

    fetchAuth(); // Call the async function
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
