//Import from the env
const api_url = import.meta.env.VITE_API_URL;

// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

//A function to send get request to get all employees
const getAllEmployees = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
};
//A function to edit an employee
const editEmployee = async (updatedEmployeeData, loggedInEmployeeToken, id) => {
  console.log(updatedEmployeeData);
  console.log(id);
  console.log(loggedInEmployeeToken);
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(updatedEmployeeData),
  };
  const response = await fetch(`${api_url}/api/employee/${id}`, requestOptions);
  console.log(response);

  console.log(`Request Options:`, requestOptions);
  console.log(`Response Status:`, response.status);
  return response;
};

//A function to delete an employee

const deleteEmployee = async (employeeId, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  const response = await fetch(
    `${api_url}/api/employee/${employeeId}`,
    requestOptions
  );
  return response;
};

//Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  editEmployee,
  deleteEmployee,
};
export default employeeService;
