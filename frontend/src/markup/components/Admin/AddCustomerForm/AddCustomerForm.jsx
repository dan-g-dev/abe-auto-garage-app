import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../contexts/AuthContext";
import { Spinner } from "react-bootstrap";

function AddCustomerForm() {
  const [formData, setFormData] = useState({
    customer_email: "",
    customer_first_name: "",
    customer_last_name: "",
    customer_phone: "",
    customer_password: "",
    active_customer: 1,
  });
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  // Get navigation origin from state
  const fromOrders = location.state?.fromOrders || false;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.customer_first_name.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.customer_email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.customer_password || formData.customer_password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await customerService.createCustomer(
        formData,
        loggedInEmployeeToken
      );

      if (response.error) {
        setServerError(response.error);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        // Determine redirect path based on navigation origin
        const redirectPath = fromOrders ? "/admin/orders" : "/admin/customers";
        navigate(redirectPath);
      }, 2000);
    } catch (error) {
      setServerError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new customer</h2>
          {fromOrders && (
            <p className="text-muted">
              You'll be redirected back to order creation after successful
              registration
            </p>
          )}
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    {serverError && (
                      <div className="col-md-12">
                        <div className="alert alert-danger" role="alert">
                          {serverError}
                        </div>
                      </div>
                    )}

                    {success && (
                      <div className="col-md-12">
                        <div
                          style={{ color: "green" }}
                          className="alert alert-success"
                          role="alert"
                        >
                          Customer created successfully! Redirecting...
                        </div>
                      </div>
                    )}

                    {/* Form fields remain the same as your original code */}
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleInputChange}
                        placeholder="Customer email"
                        className={errors.email ? "is-invalid" : ""}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={formData.customer_first_name}
                        onChange={handleInputChange}
                        placeholder="Customer first name"
                        className={errors.firstName ? "is-invalid" : ""}
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        value={formData.customer_last_name}
                        onChange={handleInputChange}
                        placeholder="Customer last name"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone"
                        value={formData.customer_phone}
                        onChange={handleInputChange}
                        placeholder="Customer phone (555-555-5555)"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="customer_password"
                        value={formData.customer_password}
                        onChange={handleInputChange}
                        placeholder="Customer password"
                        className={errors.password ? "is-invalid" : ""}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="form-group loader col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>
                          <div>
                            Add customer{" "}
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

export default AddCustomerForm;
