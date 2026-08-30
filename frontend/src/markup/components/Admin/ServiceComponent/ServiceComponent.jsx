import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../contexts/AuthContext";
import SingleServiceDisplay from "../SingleServiceDisplay/SingleServiceDisplay";
import { Card } from "react-bootstrap";

function ServiceComponent() {
  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [service_price, setServicePrice] = useState("");
  const [active_service, setActiveService] = useState(0);
  const [serviceData, setServiceData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [editingService, setEditingService] = useState(null); // Track the service being edited
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [loading, setIsLoading] = useState(false);
  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  useEffect(() => {
    setIsLoading(false);
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAllServices(
          loggedInEmployeeToken
        );
        setServiceData(response.data);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServiceData([]);
        setIsLoading(false);
      }
    };
    fetchServices();
  }, [loggedInEmployeeToken, refreshTrigger]);

  // Handle Edit Button Click
  const handleEditClick = (service) => {
    setEditingService(service);
    setServiceName(service.service_name);
    setServiceDescription(service.service_description);
    setServicePrice(service.service_price);
    setActiveService(service.active_service || 0);
    setShowModal(true); // Open the modal
  };

  // Handle Modal Close
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    setServiceName("");
    setServiceDescription("");
    setServicePrice("");
    setActiveService(0);
  };

  // Handle Submit for Creating/Updating Service
  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceDataObj = {
      service_name,
      service_description,
      service_price,
      active_service, // this will be 1 or 0
      service_id: editingService?.service_id || null, // If editing, include service_id
    };

    // Check if editing or creating a new service
    if (editingService) {
      serviceService
        .updateService(serviceDataObj, loggedInEmployeeToken)
        .then((res) => {
          setSuccessMessage("Service updated successfully!");
          setRefreshTrigger((prev) => !prev);
          handleCloseModal(); // Close modal after update
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          setSuccessMessage("Failed to update Service. Please try again.");
        });
    } else {
      serviceService
        .createService(serviceDataObj, loggedInEmployeeToken)
        .then((res) => {
          setSuccessMessage("Service added successfully!");
          setRefreshTrigger((prev) => !prev);
          setServiceName("");
          setServiceDescription("");
          setServicePrice("");
          setActiveService(0);
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          setSuccessMessage("Failed to add Service. Please try again.");
        });
    }
  };

  return (
    <section className="contact-section ">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Services we provide</h2>
        </div>

        {!loading ? (
          <div className="text-center my-5">
            <Spinner
              animation="border"
              style={{ color: "#081847" }}
              size="lg"
            />
            <p>Loading services ...</p>
          </div>
        ) : (
          <>
            {serviceData?.map((service) => (
              <SingleServiceDisplay
                key={service.service_id}
                service={service}
                onEditClick={handleEditClick}
              />
            ))}
          </>
        )}

        {/* Button to add a new service */}
        <div
          style={{ marginTop: "20px" }}
          className="form-group loader col-md-12"
        >
          <Button
            className="theme-btn btn-style-one"
            type="submit"
            data-loading-text="Please wait..."
            onClick={() => setShowModal(true)}
          >
            Add New Service
          </Button>
        </div>

        {/* Modal for editing or adding service */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>
              {editingService ? "Edit Service" : "Add New Service"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="service_name"
                  value={service_name}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="Service name"
                />
              </div>
              <div className="form-group">
                <textarea
                  name="service_description"
                  value={service_description}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Service description"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="service_price"
                  value={service_price}
                  onChange={(e) => setServicePrice(e.target.value)}
                  placeholder="Service price"
                />
              </div>
              {/* CheckBox for active_service with appealing styling */}
              <div className="form-group checkbox-container">
                <Form.Check
                  type="checkbox"
                  id="activeServiceCheck"
                  label="Active Service"
                  checked={active_service === 1}
                  onChange={(e) => setActiveService(e.target.checked ? 1 : 0)}
                />
              </div>
              <div className="form-group loader col-md-12">
                <Button
                  type="submit"
                  className="theme-btn btn-style-one"
                  data-loading-text="Please wait..."
                >
                  {editingService ? "Update Service" : "Add Service"}
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
}

export default ServiceComponent;
