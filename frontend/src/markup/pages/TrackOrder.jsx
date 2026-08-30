import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Badge,
  Spinner,
  Alert,
  CardBody,
} from "react-bootstrap";
import orderService from "../../services/order.service";
import { format } from "date-fns";
import { GiMechanicGarage } from "react-icons/gi";
import { FaCarAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

function TrackOrder() {
  const [orderHash, setOrderHash] = useState("");
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderHash.trim()) {
      setError("Please enter a valid order hash");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await orderService.trackOrder({ order_hash: orderHash });
      if (response.data) {
        setOrderDetail(response.data);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      setError("Order not found");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return dateString
      ? format(new Date(dateString), "MMM dd, yyyy HH:mm")
      : "N/A";
  };

  return (
    <div className="container py-4 contact-section">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="shadow-lg">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Track Your Order</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="orderHash">
                  <Form.Label className="fw-bold">
                    Order Tracking Code
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your order hash (e.g. ABC123)"
                    value={orderHash}
                    onChange={(e) => setOrderHash(e.target.value)}
                    disabled={loading}
                  />
                  <Form.Text className="text-muted">
                    You received this code when placing your order
                  </Form.Text>
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={loading}
                    className="px-5"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        SUBMIT
                      </>
                    ) : (
                      "SUBMIT"
                    )}
                  </Button>
                </div>
              </Form>

              {error && (
                <Alert variant="danger" className="mt-4">
                  {error}
                </Alert>
              )}
            </Card.Body>
          </Card>

          {orderDetail && (
            <div className="mt-5">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="mb-4">
                  <p className="mb-1">
                    <strong>
                      {" "}
                      {orderDetail.customer_first_name}{" "}
                      {orderDetail.customer_last_name}
                    </strong>
                  </p>
                </h1>
                <div className="col-md-">
                  <Badge
                    bg={
                      orderDetail.active_order === 2
                        ? "secondary"
                        : orderDetail.active_order === 1
                        ? "success"
                        : "warning"
                    }
                    style={{ boarderRadius: "10px" }}
                  >
                    {orderDetail.active_order === 2
                      ? "Received"
                      : orderDetail.active_order === 1
                      ? "Completed"
                      : "In Progress"}
                  </Badge>
                </div>
              </div>
              <Card className="mb-4">
                <CardBody>
                  <p>
                    You can track the progress of your order using this page. We
                    will constantly update this page to let you know how we are
                    progressing. As soon as we are done with the order, the
                    status will turn green. That means, your car is ready for
                    pickup
                  </p>
                </CardBody>
              </Card>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">
                    <IoPersonOutline /> Customer Information
                  </h5>
                  <div className="row">
                    <div className="col-md-6">
                      <p className="mb-1">
                        <strong>Email:</strong> {orderDetail.customer_email}
                      </p>
                      <p className="mb-0">
                        <strong>Phone:</strong>{" "}
                        {orderDetail.customer_phone_number}
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">
                    <FaCarAlt /> Vehicle Information
                  </h5>
                  <div className="row">
                    <div className="col-md-6">
                      <p className="mb-1">
                        <strong>Make/Model:</strong> {orderDetail.vehicle_make}{" "}
                        {orderDetail.vehicle_model}
                      </p>
                      <p className="mb-1">
                        <strong>Year:</strong> {orderDetail.vehicle_year}
                      </p>
                      <p className="mb-1">
                        <strong>Color:</strong> {orderDetail.vehicle_color}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1">
                        <strong>Mileage:</strong>{" "}
                        {orderDetail.vehicle_mileage.toLocaleString()} miles
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {orderDetail?.services?.length > 0 && (
                <Card className="mb-4 shadow-sm">
                  <Card.Body>
                    <div className="d-flex ">
                      <h5 className="mb-3 justify-content">
                        {" "}
                        <GiMechanicGarage size={30} /> Requested Services
                      </h5>
                    </div>
                    {orderDetail.services.map((service, index) => (
                      <div key={index} className="mb-3 p-3 border rounded">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{service.service_name}</h6>
                            <p className="text-muted mb-0">
                              {service.service_description}
                            </p>
                          </div>
                          <Badge
                            pill
                            bg={
                              service.service_completed === 1
                                ? "success"
                                : "warning"
                            }
                            className="fs-6 px-3 py-2"
                          >
                            {service.service_completed === 1
                              ? "Completed"
                              : "In Progress"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {orderDetail?.additional_request && (
                      <Card className="shadow-sm">
                        <Card.Body>
                          <h5 className="mb-3"> Additional Requests</h5>
                          <div className="d-flex justify-content-between align-items-center">
                            {/* <span className="text-muted">Request Status:</span> */}
                            <p className="mb-2">
                              {orderDetail.additional_request}
                            </p>
                            <Badge
                              bg={
                                orderDetail.additional_requests_completed === 1
                                  ? "success"
                                  : "secondary"
                              }
                              className="fs-6 px-3 py-2"
                              style={{ boarderRadius: "3px" }}
                            >
                              {orderDetail.additional_requests_completed === 1
                                ? "Completed"
                                : "In Progress"}
                            </Badge>
                          </div>
                        </Card.Body>
                      </Card>
                    )}
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
