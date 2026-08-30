import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../../../contexts/AuthContext";
import customerService from "../../../../services/customer.service";
import { Spinner } from "react-bootstrap";
function EditCustomerForm() {
  const location = useLocation();
  // Access customerData from state
  const { customerData } = location.state || {};
  console.log(customerData);
  const [formData, setFormData] = useState({
    customer_email: customerData?.customer_email || "",
    customer_first_name: customerData?.customer_first_name || "",
    customer_last_name: customerData?.customer_last_name || "",
    customer_phone: customerData?.customer_phone_number || "",
    active_customer: customerData?.active_customer_status === 1,
  });
  console.log(formData);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

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
  let loggedEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  console.log(employee);
  if (employee && employee.employee_id) {
    loggedEmployeeToken = employee.employee_token;
  }
  //Handle form submission

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setError(null);
    setSuccess(null);
    //Prepare the updated customer data payload
    try {
      const updatedCustomerData = {
        ...formData,
        active_customer: formData.active_customer ? 1 : 0, // Convert back to "1"/"
      };
      console.log(updatedCustomerData);
      customerService
        .editCustomer(
          updatedCustomerData,
          loggedEmployeeToken,
          customerData?.customer_id
        )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.success === false) {
            setError(response.message);
          } else {
            setSuccess("customer updated successfully!");
            setLoading(false);
            // Redirect to the customers page after 2 seconds
            setTimeout(() => {
              // redirect to customers page
              navigate("/admin/customers");
            }, 2000);
          }
        });
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error updating customer:", error);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit: {customerData?.customer_first_name} </h2>
        </div>
        <h2 style={{ paddingBottom: "2rem" }}>
          customer Email: {customerData?.customer_email}
        </h2>
        {error && (
          <div className="validation-error" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div
            style={{ color: "green" }}
            className="success-message"
            role="alert"
          >
            {success} Redirecting...
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
                        name="customer_first_name"
                        placeholder="Edit first name"
                        value={formData.customer_first_name}
                        onChange={handleChange}
                      />
                      <div className="validation-error" role="alert"></div>
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        placeholder="Edit last name"
                        value={formData.customer_last_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone"
                        placeholder="Edit phone number"
                        value={formData.customer_phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          name="active_customer"
                          checked={formData.active_customer}
                          onChange={handleChange}
                        />
                        <label htmlFor="customer_status">
                          Is active customer
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
                            {loading && (
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

export default EditCustomerForm;
