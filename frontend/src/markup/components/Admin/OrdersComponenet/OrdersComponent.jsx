import React, { useState, useEffect } from "react";
import orderService from "../../../../services/order.service";
import { useAuth } from "../../../../contexts/AuthContext";
import { format } from "date-fns";
import { MdLockOutline } from "react-icons/md";
import {
  Table,
  Button,
  Modal,
  Badge,
  Spinner,
  Pagination,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa6";

function OrdersComponent({ orderFromCustomer }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(10); // Orders per page
  const [customerPage, setCustomerPage] = useState(1); // Page for customer-specific orders
  const navigate = useNavigate();
  const { employee } = useAuth();
  let loggedInEmployeeToken = employee?.employee_token || "";

  useEffect(() => {
    orderService
      .getAllOrders(loggedInEmployeeToken)
      .then((res) => {
        setOrders(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [loggedInEmployeeToken]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleEditClick = (order) => {
    navigate(`/admin/edit-order/${order.order_id}`, { state: { order } });
  };

  // Pagination logic for general orders table
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Pagination logic for customer-specific orders table
  const customerIndexOfLastItem = customerPage * itemsPerPage;
  const customerIndexOfFirstItem = customerIndexOfLastItem - itemsPerPage;
  const currentCustomerOrders = orderFromCustomer?.slice(
    customerIndexOfFirstItem,
    customerIndexOfLastItem
  );
  const customerTotalPages = Math.ceil(
    orderFromCustomer?.length / itemsPerPage
  );

  return (
    <section className="contact-section">
      <div className="auto-container">
        {!orderFromCustomer && (
          <div className="contact-title">
            <h2>Orders </h2>
          </div>
        )}

        {loading ? (
          <div className="text-center my-5">
            <Spinner
              animation="border"
              style={{ color: "#081847" }}
              size="lg"
            />
            <p>Loading orders...</p>
          </div>
        ) : orderFromCustomer ? (
          !currentCustomerOrders ? (
            <div>No Order Available</div>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Order Date</th>
                    <th>Received by</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomerOrders.map((order) => (
                    <tr key={order.order_id}>
                      <td>{order.order_id}</td>
                      <td>
                        <div className="customer-info">
                          <strong>{order.customer_name}</strong>
                          <div>{order.customer_email}</div>
                          <div>{order.customer_phone_number}</div>
                        </div>
                      </td>
                      <td>
                        <div className="vehicle-info">
                          <strong>{order.vehicle_make}</strong>
                          <div>{order.vehicle_year}</div>
                          <div>{order.vehicle_tag}</div>
                        </div>
                      </td>
                      <td>
                        {format(new Date(order.order_date), "MM/dd/yyyy HH:mm")}
                      </td>
                      <td>{order.employee_name}</td>
                      <td>
                        <Badge
                          style={{ borderRadius: "20px" }}
                          bg={
                            order.active_order === 2
                              ? "secondary" // Color for "Received"
                              : order.active_order
                              ? "success" // Color for "Completed"
                              : "warning" // Color for "In Progress"
                          }
                        >
                          {order.active_order === 2 ? (
                            <span>
                              Received <FaLock />
                            </span>
                          ) : order.active_order ? (
                            "Completed"
                          ) : (
                            "In Progress"
                          )}
                        </Badge>
                      </td>
                      <td>
                        <div>
                          <Button
                            variant=""
                            onClick={() => handleViewDetails(order)}
                          >
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </Button>
                          <Button
                            variant=""
                            onClick={() => handleEditClick(order)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Order Date</th>
                  <th>Received by</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>
                      <div className="customer-info">
                        <strong>{order.customer_name}</strong>
                        <div>{order.customer_email}</div>
                        <div>{order.customer_phone_number}</div>
                      </div>
                    </td>
                    <td>
                      <div className="vehicle-info">
                        <strong>{order.vehicle_make}</strong>
                        <div>{order.vehicle_year}</div>
                        <div>{order.vehicle_tag}</div>
                      </div>
                    </td>
                    <td>
                      {format(new Date(order.order_date), "MM/dd/yyyy HH:mm")}
                    </td>
                    <td>{order.employee_name}</td>
                    <td>
                      <Badge
                        style={{ borderRadius: "20px" }}
                        bg={
                          order.active_order === 2
                            ? "secondary" // Color for "Received"
                            : order.active_order
                            ? "success" // Color for "Completed"
                            : "warning" // Color for "In Progress"
                        }
                      >
                        {order.active_order === 2 ? (
                          <span>
                            Received <FaLock />
                          </span>
                        ) : order.active_order ? (
                          "Completed"
                        ) : (
                          "In Progress"
                        )}
                      </Badge>
                    </td>
                    <td>
                      <div>
                        <Button
                          variant=""
                          onClick={() => handleViewDetails(order)}
                        >
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </Button>
                        <Button
                          variant=""
                          onClick={() => handleEditClick(order)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Pagination for customer orders */}
        {orderFromCustomer && (
          <div className="pagination-container">
            <Pagination className="d-flex justify-content-center my-4">
              <Pagination.Prev
                onClick={() => setCustomerPage((prev) => Math.max(prev - 1, 1))}
                disabled={customerPage === 1}
              />
              {[...Array(customerTotalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === customerPage}
                  onClick={() => setCustomerPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  setCustomerPage((prev) =>
                    Math.min(prev + 1, customerTotalPages)
                  )
                }
                disabled={customerPage === customerTotalPages}
              />
            </Pagination>
          </div>
        )}

        {/* Pagination for all orders */}
        {!orderFromCustomer && (
          <div className="pagination-container">
            <Pagination className="d-flex justify-content-center my-4">
              <Pagination.Prev
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}

        {/* Order Details Modal */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="lg"
          centered
        >
          {selectedOrder && (
            <>
              <Modal.Header closeButton className="modal-header-custom">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <Modal.Title>
                    Order #{selectedOrder.order_id} Details
                  </Modal.Title>

                  <Badge
                    style={{
                      borderRadius: "20px",
                      padding: "6px 12px",
                      fontSize: "14px",
                    }}
                    bg={
                      selectedOrder.active_order === 2
                        ? "secondary" // Color for "Received"
                        : selectedOrder.active_order
                        ? "success" // Color for "Completed"
                        : "warning" // Color for "In Progress"
                    }
                  >
                    {selectedOrder.active_order === 2 ? (
                      <span>
                        Received <FaLock />
                      </span>
                    ) : selectedOrder.active_order ? (
                      "Completed"
                    ) : (
                      "In Progress"
                    )}
                  </Badge>
                </div>
              </Modal.Header>

              <Modal.Body>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Customer Information</strong>
                    <p>
                      <strong>Name:</strong> {selectedOrder.customer_name}
                      <br />
                      <strong>Email:</strong> {selectedOrder.customer_email}
                      <br />
                      <strong>Phone:</strong>{" "}
                      {selectedOrder.customer_phone_number}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <strong>Vehicle Details</strong>
                    <p>
                      <strong>Vehicle:</strong> {selectedOrder.vehicle_make}
                      <br />
                      <strong>Year:</strong> {selectedOrder.vehicle_year}
                      <br />
                      <strong>Tag:</strong> {selectedOrder.vehicle_tag}
                    </p>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Order Information</strong>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {format(
                        new Date(selectedOrder.order_date),
                        "MM/dd/yyyy HH:mm"
                      )}
                      <br />
                      <strong>Estimated Completion:</strong>{" "}
                      {format(
                        new Date(selectedOrder?.estimated_completion_date),
                        "MM/dd/yyyy"
                      )}
                      <br />
                      <strong>Total Price:</strong> $
                      {selectedOrder.order_total_price}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <strong>Assigned Employee</strong>
                    <p>{selectedOrder.employee_name}</p>
                  </div>
                </div>

                <div>
                  <strong>Order Hash</strong>
                  <div className="services-list">
                    <Badge className="ms-2" bg="">
                      <span>{selectedOrder.order_hash}</span>
                    </Badge>
                  </div>
                </div>
                <div>
                  <strong>Services Requested</strong>
                  <div className="services-list">
                    {selectedOrder.services.map((service, index) => (
                      <Badge key={index} bg="info" className="me-2 mb-2">
                        {service.service_name}
                        <span className="ms-2">
                          (
                          {service.service_completed
                            ? "Completed"
                            : "In Progress"}
                          )
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedOrder.additional_request && (
                  <div className="additional-notes mt-3">
                    <h5>Additional Requests</h5>
                    <p>
                      {selectedOrder.additional_request} (
                      {selectedOrder.additional_requests_completed
                        ? "Completed"
                        : "In Progress"}
                      )
                    </p>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button
                  style={{
                    borderRadius: "90px",
                    paddingBottom: "1px",
                    paddingTop: "1px",
                  }}
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    </section>
  );
}

export default OrdersComponent;
