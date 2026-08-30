import React, { useState } from "react";
//import employee Service
import employeeService from "../../../../services/employee.service";
//import the useAuth custom hook
import { useAuth } from "../../../../contexts/AuthContext";
//import the useNavigate hook
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
function EditEmployeeForm({ employeeData }) {
  console.log(employeeData.employee_email);
  //Initialize the form state with the passed employee data
  const [formData, setFormData] = useState({
    employee_email: employeeData?.employee_email || "",
    employee_first_name: employeeData?.employee_first_name || "",
    employee_last_name: employeeData?.employee_last_name || "",
    employee_phone: employeeData?.employee_phone || "",
    active_employee: employeeData?.active_employee === 1,
    company_role_id: employeeData?.company_role_id || "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [Loading, setLoading] = useState(false);

  //Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // Destructure the navigate hook
  const navigate = useNavigate();
  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  console.log(employee);
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }
  //Handle form submission
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setError(null);
    setSuccess(null);
    //Prepare the updated employee data payload
    try {
      const updatedEmployeeData = {
        ...formData,
        active_employee: formData.active_employee ? 1 : 0, // Convert back to "1"/"
      };
      console.log(updatedEmployeeData);
      employeeService
        .editEmployee(
          updatedEmployeeData,
          loggedInEmployeeToken,
          employeeData?.employee_id
        )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.success === false) {
            setError(response.message);
          } else {
            setSuccess("Employee updated successfully!");
            setLoading(false);
            // Redirect to the employees page after 2 seconds
            setTimeout(() => {
              // redirect to employees page
              navigate("/admin/employees");
            }, 2000);
          }
        });
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error updating employee:", error);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit: {employeeData?.employee_first_name} </h2>
        </div>
        <h2 style={{ paddingBottom: "2rem" }}>
          Employee Email: {employeeData?.employee_email}
        </h2>
        {error && (
          <div className="validation-error" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div style={{color:"green"}} className="success-message" role="alert">
            {success}
          </div>
        )}
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        placeholder="Edit first name"
                        value={formData.employee_first_name}
                        onChange={handleChange}
                      />
                      <div className="validation-error" role="alert"></div>
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        placeholder="Edit last name"
                        value={formData.employee_last_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        placeholder="Edit phone number"
                        value={formData.employee_phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        name="company_role_id"
                        className="custom-select-box"
                        value={formData.company_role_id}
                        onChange={handleChange}
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12">
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          name="active_employee"
                          checked={formData.active_employee}
                          onChange={handleChange}
                        />
                        <label htmlFor="employee_status">
                          Is active employee
                        </label>
                      </div>
                    </div>

                    <div className="form-group loader col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>
                          <div>
                            update{" "}
                            {Loading && (
                              <Spinner
                                animation="border"
                                style={{ color: "#081847" }}
                                size="lg"
                              />
                            )}
                          </div>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditEmployeeForm;
