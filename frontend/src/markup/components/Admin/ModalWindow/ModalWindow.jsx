import React from "react";
import { Table, Button, Modal, Badge, Spinner } from "react-bootstrap";

function ModalWindow({selectedOrder}) {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      centered
    >
      {selectedOrder && (
        <>
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>
              Order #{selectedOrder.order_id} Details
              <Badge
                bg={selectedOrder.active_order ? "warning" : "success"}
                className="ms-2"
                style={{ borderRadius: "20px" }}
              >
                {selectedOrder.active_order ? "In Progress" : "Completed"}
              </Badge>
            </Modal.Title>
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
                  <strong>Phone:</strong> {selectedOrder.customer_phone_number}
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
                    new Date(selectedOrder.estimated_completion_date),
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
              <strong>Services Requested</strong>
              <div className="services-list">
                {selectedOrder.services.map((service, index) => (
                  <Badge key={index} bg="info" className="me-2 mb-2">
                    {service.service_name}
                    <span className="ms-2">
                      ({service.service_completed ? "Completed" : "In Progress"}
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
              style={{ borderRadius: "20px" }}
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}

export default ModalWindow;
