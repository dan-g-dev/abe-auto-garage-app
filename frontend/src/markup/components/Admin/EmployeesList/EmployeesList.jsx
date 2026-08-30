// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Spinner, Pagination } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../contexts/AuthContext";
// Import the date-fns library
import { format } from "date-fns"; // To properly format the date on the table
// Import useNavigate hook
import { useNavigate } from "react-router-dom";
// Import the getAllEmployees function
import employeeService from "../../../../services/employee.service";
// Import font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// Create the EmployeeList component
const EmployeeList = () => {
  // Create all the states we need to store the data
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Added state for current page
  const [employeesPerPage] = useState(10); // Number of employees to display per page
  const { employee } = useAuth();
  const navigate = useNavigate();

  // To store the token
  let token = employee?.employee_token || null;

  useEffect(() => {
    // Don't proceed if token is missing
    if (!token) return;
    // Reset errors before each attempt
    setApiError(false);
    setApiErrorMessage(null);
    // Call the getAllEmployees function
    employeeService
      .getAllEmployees(token)
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Unauthorized. Please log in again.");
          } else if (res.status === 403) {
            setApiErrorMessage(
              "You don't have the necessary permissions to view this page."
            );
          } else {
            setApiErrorMessage("An error occurred while fetching the data.");
          }
        }
        return res.json();
      })
      .then((res) => {
        if (res.data !== 0) {
          setEmployees(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        // Handle error
      });
  }, [token]);

  // Edit employee function
  const handleEdit = (employee) => {
    navigate(`/admin/edit-employee/${employee.employee_id}`, {
      state: { employee },
    });
  };

  // Handle delete click
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!selectedEmployee) return;
    try {
      await employeeService.deleteEmployee(selectedEmployee.employee_id, token);
      setEmployees((prevEmployees) =>
        prevEmployees.filter(
          (emp) => emp.employee_id !== selectedEmployee.employee_id
        )
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
    setShowModal(false);
  };

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2>
              </div>

              {loading ? (
                <div className="text-center my-5">
                  <Spinner
                    animation="border"
                    style={{ color: "#081847" }}
                    size="lg"
                  />
                  <p>Loading employees...</p>
                </div>
              ) : (
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="orders-table"
                >
                  <thead>
                    <tr>
                      <th>Active</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added Date</th>
                      <th>Role</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEmployees.map((employee) => (
                      <tr key={employee.employee_id}>
                        <td>{employee.active_employee ? "Yes" : "No"}</td>
                        <td>{employee.employee_first_name}</td>
                        <td>{employee.employee_last_name}</td>
                        <td>{employee.employee_email}</td>
                        <td>{employee.employee_phone}</td>
                        <td>
                          {format(
                            new Date(employee.added_date),
                            "MM/dd/yyyy | kk:mm"
                          )}
                        </td>
                        <td>{employee.company_role_name}</td>
                        <td>
                          <div className="edit-delete-icons">
                            <Button
                              variant=""
                              onClick={() => handleEdit(employee)}
                            >
                              <FontAwesomeIcon icon={faEdit} />{" "}
                              {/* Edit icon */}
                            </Button>{" "}
                            <Button
                              variant=""
                              onClick={() => handleDeleteClick(employee)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />{" "}
                              {/* Delete icon */}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {/* Pagination */}
              <div className="pagination-container">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-prev"
                  />
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                      className="pagination-item"
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-next"
                  />
                </Pagination>
              </div>
            </div>
          </section>

          {/* Modal for deleting employee */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header className="modal-header-custom" closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete{" "}
              <strong>
                {selectedEmployee?.employee_first_name}{" "}
                {selectedEmployee?.employee_last_name}
              </strong>
              ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

// Export the EmployeeList component
export default EmployeeList;
