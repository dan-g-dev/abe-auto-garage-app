import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faShoppingCart,
  faUser,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import vehicleService from "../../../../services/vehicle.service";
import orderService from "../../../../services/order.service";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../../../contexts/AuthContext";
import OrdersComponent from "../OrdersComponenet/OrdersComponent";

function CustomerDetailComponent() {
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicle_year, setVehicleYear] = useState("");
  const [order, setOrders] = useState([]);
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [vehicleData, setVehicleData] = useState([]);
  //RefreshTrigger state
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  //define useLocation
  const location = useLocation();
  //The customerData is sent as a props either from the customerList component when detail icon is clicked or from the New orders pages when add new vehicle button is clicked. - so CustomerDetailComponent called from two placed to do its work.
  const customerData =
    location.state?.selectedCustomer ||
    (location.state?.customer ? location.state.customer : null);
  console.log(customerData);
  const customer_id = customerData?.customer_id;
  console.log(customer_id);
  // Get navigation origin from state
  const { fromOrders } = location.state || {};
  console.log(fromOrders);
  const navigate = useNavigate();
  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // Fetch vehicles when the component mounts or when refreshTrigger changes
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await vehicleService.getVehicle(
          customer_id,
          loggedInEmployeeToken
        );
        setVehicleData(response);
        console.log(response.length);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicleData([]);
      }
    };

    fetchVehicles();
  }, [customer_id, loggedInEmployeeToken, refreshTrigger]);

  useEffect(() => {
    try {
      orderService
        .getCustomerOrders(customer_id, loggedInEmployeeToken)
        .then((res) => {
          setOrders(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  }, [customer_id, loggedInEmployeeToken, refreshTrigger]);

  const handleEdit = (customerData) => {
    navigate(`/admin/edit-customer/${customerData.customer_id}`, {
      state: { customerData },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicleFormData = {
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    };

    vehicleService
      .createVehicle(vehicleFormData, loggedInEmployeeToken)
      .then((data) => {
        console.log(data);
        setSuccessMessage("Vehicle added successfully!");
        // Clear the form fields
        setVehicleYear("");
        setVehicleMake("");
        setVehicleModel("");
        setVehicleType("");
        setVehicleMileage("");
        setVehicleTag("");
        setVehicleSerial("");
        setVehicleColor("");
        // Trigger refresh after successful submission
        setRefreshTrigger((prev) => !prev);
        const redirectPath = fromOrders && "/admin/order";
        navigate(redirectPath);
        // Clear success message after 2 seconds
        if (successMessage) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setSuccessMessage("Failed to add vehicle. Please try again.");
      });
  };

  // Render the vehicle table
  const renderVehicleTable = () => (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Year</th>
          <th>Make</th>
          <th>Model</th>
          <th>Type</th>
          <th>Color</th>
          <th>Mileage</th>
          <th>Tag</th>
          <th>Serial</th>
        </tr>
      </thead>
      <tbody>
        {vehicleData.map((vehicle) => (
          <tr key={vehicle.vehicle_id}>
            <td>{vehicle.vehicle_year}</td>
            <td>{vehicle.vehicle_make}</td>
            <td>{vehicle.vehicle_model}</td>
            <td>{vehicle.vehicle_type}</td>
            <td>{vehicle.vehicle_color}</td>
            <td>{vehicle.vehicle_mileage}</td>
            <td>{vehicle.vehicle_tag}</td>
            <td>{vehicle.vehicle_serial}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div className="customer-detail-container">
      {/* Customer Information Section */}
      <div className="customer-info-section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faUser} className="icon" /> Customer
          Information
        </h2>
        <div className="info-card">
          <div className="info-item">
            <span className="info-label">Name: </span>
            <span className="info-value">
              {customerData?.customer_first_name}{" "}
              {customerData?.customer_last_name}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Email: </span>
            <span className="info-value">{customerData?.customer_email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone: </span>
            <span className="info-value">
              {customerData?.customer_phone_number}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className="info-value">
              {customerData?.active_customer_status ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Edit Customer Info:</span>
            <button onClick={() => handleEdit(customerData)}>
              <FontAwesomeIcon color="red" icon={faEdit} />
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Information Section */}
      <div
        className="vehicle-info-section"
        style={{
          position: "relative",
          paddingRight: showVehicleForm ? "40px" : "0",
        }}
      >
        <h2 className="section-title">
          <FontAwesomeIcon icon={faCar} className="icon" /> Vehicles of{" "}
          {customerData?.customer_first_name}
        </h2>

        {vehicleData.length > 0 ? (
          renderVehicleTable()
        ) : (
          <div className="info-card">
            <div>No vehicles found</div>
          </div>
        )}

        {!showVehicleForm && (
          <button
            className="theme-btn btn-style-one add-new-vehicle"
            type="submit"
            onClick={() => setShowVehicleForm(true)}
            data-loading-text="Please wait..."
          >
            <span>Add new vehicle</span>
          </button>
        )}

        {showVehicleForm && (
          <div className="info-card add-new-vehicle-box">
            <div
              className="section-header1"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="link"
                onClick={() => setShowVehicleForm(false)}
                style={{ padding: "0", marginLeft: "auto" }}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  border
                  className="text-danger"
                />
              </Button>
            </div>

            <section className="contact-section">
              <div className="auto-container">
                <div className="contact-title">
                  <h2>Add a new vehicle</h2>
                </div>
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
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
                                name="vehicle_year"
                                value={vehicle_year}
                                onChange={(event) =>
                                  setVehicleYear(event.target.value)
                                }
                                placeholder="Vehicle year"
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_make"
                                value={vehicle_make}
                                onChange={(event) =>
                                  setVehicleMake(event.target.value)
                                }
                                placeholder="Vehicle make"
                              />
                            </div>

                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_model"
                                value={vehicle_model}
                                onChange={(event) =>
                                  setVehicleModel(event.target.value)
                                }
                                placeholder="Vehicle model"
                                required
                              />
                            </div>

                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_type"
                                value={vehicle_type}
                                onChange={(event) =>
                                  setVehicleType(event.target.value)
                                }
                                placeholder="Vehicle type"
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_mileage"
                                value={vehicle_mileage}
                                onChange={(event) =>
                                  setVehicleMileage(event.target.value)
                                }
                                placeholder="Vehicle mileage"
                                required
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_tag"
                                value={vehicle_tag}
                                onChange={(event) =>
                                  setVehicleTag(event.target.value)
                                }
                                placeholder="Vehicle tag"
                                required
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_serial"
                                value={vehicle_serial}
                                onChange={(event) =>
                                  setVehicleSerial(event.target.value)
                                }
                                placeholder="Vehicle serial"
                                required
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_color"
                                value={vehicle_color}
                                onChange={(event) =>
                                  setVehicleColor(event.target.value)
                                }
                                placeholder="Vehicle color"
                                required
                              />
                            </div>

                            <div className="form-group col-md-12">
                              <button
                                className="theme-btn btn-style-one"
                                type="submit"
                                data-loading-text="Please wait..."
                              >
                                <span>Add vehicle</span>
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
          </div>
        )}
      </div>

      {/* Orders Information Section */}
      <div className="orders-info-section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faShoppingCart} className="icon" /> Orders of{" "}
          {customerData?.customer_first_name}
        </h2>

        {order &&
       <OrdersComponent orderFromCustomer = {order}/>
        }
      </div>
    </div>
  );
}

export default CustomerDetailComponent;
