import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import serviceService from "../../../services/service.service";
import { useAuth } from "../../../contexts/AuthContext";
import orderService from "../../../services/order.service";
import { FaLock } from "react-icons/fa6";
import {
  Form,
  Card,
  ListGroup,
  FormCheck,
  CardBody,
  Button,
} from "react-bootstrap";

function EditOrderComponent() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [additionalRequest, setAdditionalRequest] = useState();
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [additionalPrice, setAdditionalPrice] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [order_received, setOrderReceived] = useState(false);
  const [additionalRequestCompleted, setAdditionalRequestCompleted] =
    useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  let loggedInEmployeeToken = "";
  const { employee } = useAuth();

  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // Show received message if active_order is 2
  if (order?.active_order === 2) {
    return (
      <div className="container py-4 contact-section d-flex justify-content-center">
        <Card
          style={{
            borderRadius: "12px",
            maxWidth: "500px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Card.Body>
            <h3  style={{ fontWeight: "bold" }} className="mb-3  secondary"><FaLock size={20} /> ORDER RECEIVED 
            </h3>
            <p >
              This order has been successfully completed and received by the
              customer.
            </p>
            <Link to="/admin/order">
              <Button variant="secondary" className="mt-2">
                CREAT A NEW ORDER
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    if (order) {
      setOrderReceived(order.active_order === 2);
      setServiceDescription(order.additional_request || "");
      setAdditionalRequestCompleted(order.additional_requests_completed || 0);

      if (order.additional_service_price) {
        setServicePrice(order.additional_service_price.toString());
      }
    }
  }, [order]);

  useEffect(() => {
    if (order && services?.length > 0) {
      const initialSelectedServices = order.services.map((service) => {
        const serviceFromServices = services.find(
          (s) => s.service_id === service.service_id
        );
        return {
          service_id: service.service_id,
          service_name: service.service_name,
          service_price:
            service.service_price !== undefined
              ? service.service_price
              : serviceFromServices
              ? serviceFromServices.service_price
              : 0,
          service_completed: service.service_completed,
        };
      });
      setSelectedServices(initialSelectedServices);
    }
  }, [order, services]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAllServices(
          loggedInEmployeeToken
        );
        setServices(response.data);
      } catch (err) {
        console.error("Error fetching services", err);
      }
    };
    fetchServices();
  }, [loggedInEmployeeToken]);

  const handleServiceSelect = (service) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.service_id === service.service_id);
      if (exists) {
        return prev.filter((s) => s.service_id !== service.service_id);
      }
      return [...prev, { ...service, service_completed: 0 }];
    });
  };

  const handleStatusChange = (serviceId, newStatus) => {
    setSelectedServices((prev) =>
      prev.map((service) =>
        service.service_id === serviceId
          ? { ...service, service_completed: parseInt(newStatus) }
          : service
      )
    );
  };

  useEffect(() => {
    const serviceTotal = selectedServices?.reduce(
      (sum, service) => sum + (parseFloat(service.service_price) || 0),
      0
    );
    // console.log(serviceTotal);
    setTotalPrice(serviceTotal + (parseFloat(servicePrice) || 0));
  }, [selectedServices, servicePrice]);

  useEffect(() => {
    const additionalPriceCalculated = order.order_total_price - totalPrice;
    setAdditionalPrice(additionalPriceCalculated);
  }, [services]);

  const handleEditOrder = async () => {
    try {
      const orderData = {
        order_id: order.order_id,
        services: selectedServices,
        totalPrice: totalPrice,
        order_received: order_received ? 2 : 0,
        additional_request: serviceDescription.trim() || null,
        additional_requests_completed: serviceDescription.trim()
          ? additionalRequestCompleted
          : null,
        additional_service_price: servicePrice || null,
      };

      await orderService.updateOrder(orderData, loggedInEmployeeToken);
      navigate("/admin/orders");
    } catch (err) {
      console.error("Error submitting order", err);
    }
  };

  return (
    <div className="container py-4 contact-section">
      <h2>Update Order</h2>
      <div className="my-4">
        <Card style={{ borderRadius: "10px" }}>
          <Card.Body>
            <h4>Customer Information</h4>
            <p>
              <strong>Name:</strong> {order.customer_name} <br />
              <strong>Email:</strong> {order.customer_email} <br />
              <strong>Phone:</strong> {order.customer_phone_number}
            </p>
            <FormCheck
              type="checkbox"
              label="Mark as received"
              checked={order_received}
              onChange={(e) => setOrderReceived(e.target.checked)}
              disabled={order.active_order === 0}
            />
          </Card.Body>
        </Card>

        <Card style={{ borderRadius: "10px" }} className="mt-3">
          <Card.Body>
            <h4>Vehicle Information</h4>
            <p>
              <strong>Model:</strong> {order.vehicle_model} <br />
              <strong>Color:</strong> {order.vehicle_color} <br />
              <strong>Tag:</strong> {order.vehicle_tag} <br />
              <strong>Year:</strong> {order.vehicle_year} <br />
              <strong>Mileage:</strong> {order.vehicle_mileage} <br />
              <strong>Serial:</strong> {order.vehicle_serial}
            </p>
          </Card.Body>
        </Card>

        <Card style={{ borderRadius: "10px" }} className="my-4">
          <Card.Body>
            <h4>Select Services</h4>
            <ListGroup>
              {services?.map((service) => {
                const isSelected = selectedServices?.some(
                  (s) => s.service_id === service.service_id
                );
                const selectedService = selectedServices?.find(
                  (s) => s.service_id === service.service_id
                );
                return (
                  <div key={service.service_id}>
                    <Card className="mb-3" style={{ borderRadius: "10px" }}>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="flex-grow-1">
                            <h4>{service.service_name}</h4>
                            <p>{service.service_description}</p>
                            <div style={{ color: "red" }}>
                              ${service.service_price}
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-2 checkbox-container">
                            <FormCheck
                              className="custom-checkbo"
                              checked={isSelected}
                              onChange={() => handleServiceSelect(service)}
                            />
                            {isSelected && (
                              <Form.Select
                                className="custom-dropdown"
                                value={selectedService?.service_completed}
                                onChange={(e) =>
                                  handleStatusChange(
                                    service.service_id,
                                    e.target.value
                                  )
                                }
                                size="sm"
                                style={{ minWidth: "120px" }}
                              >
                                <option value={0}>In Progress</option>
                                <option value={1}>Completed</option>
                              </Form.Select>
                            )}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </ListGroup>
          </Card.Body>
        </Card>

        {order?.additional_request ? (
          <Card style={{ borderRadius: "10px" }} className="mt-3">
            <Card.Body>
              <div className="row clearfix">
                <div className="form-column col-lg-7">
                  <div className="inner-column">
                    <div className="contact-form">
                      <div className="contact-title">
                        <h2>Additional requests</h2>
                      </div>
                      <div className="row clearfix">
                        <div className="form-group col-md-12">
                          <textarea
                            type="text"
                            name="service_description"
                            value={serviceDescription}
                            onChange={(event) =>
                              setServiceDescription(event.target.value)
                            }
                            placeholder="Service description"
                          />
                        </div>
                        <div className="col-md-6 mt-3">
                          <Form.Group controlId="additionalRequestStatus">
                            <Form.Label>Additional Request Status</Form.Label>
                            <Form.Select
                              className="additionalRequestStatuss"
                              value={additionalRequestCompleted}
                              onChange={(e) =>
                                setAdditionalRequestCompleted(
                                  parseInt(e.target.value)
                                )
                              }
                            >
                              <option value={0}>In Progress</option>
                              <option value={1}>Completed</option>
                            </Form.Select>
                          </Form.Group>
                        </div>

                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            name="price"
                            value={servicePrice || additionalPrice}
                            onChange={(event) =>
                              setServicePrice(event.target.value)
                            }
                            placeholder="price"
                          />
                        </div>
                      </div>
                      <Card className="mt-3">
                        <Card.Body>
                          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
                        </Card.Body>
                      </Card>
                      <div className="form-group col-md-12">
                        <button
                          style={{ marginTop: "1rem" }}
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                          variant="primary"
                          onClick={handleEditOrder}
                          disabled={selectedServices.length === 0}
                        >
                          <span>Update order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Card style={{ borderRadius: "10px" }} className="mt-3">
            <Card.Body>
              <div className="row clearfix">
                <div className="form-column col-lg-7">
                  <div className="inner-column">
                    <div className="contact-form">
                      <div className="contact-title">
                        <h2>Additional requests</h2>
                      </div>
                      <div className="row clearfix">
                        <div className="form-group col-md-12">
                          <textarea
                            type="text"
                            name="service_description"
                            value={serviceDescription}
                            onChange={(event) =>
                              setServiceDescription(event.target.value)
                            }
                            placeholder="Service description"
                          />
                        </div>
                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            name="price"
                            value={servicePrice}
                            onChange={(event) =>
                              setServicePrice(event.target.value)
                            }
                            placeholder="price"
                          />
                        </div>
                      </div>
                      <Card className="mt-3">
                        <Card.Body>
                          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
                        </Card.Body>
                      </Card>
                      <div className="form-group col-md-12">
                        <button
                          style={{ marginTop: "1rem" }}
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                          variant="primary"
                          onClick={handleEditOrder}
                          disabled={selectedServices.length === 0}
                        >
                          <span>Update order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}

export default EditOrderComponent;
