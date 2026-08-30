import React, { useState, useEffect } from "react";
import { Table, Button, Form, Spinner, Pagination } from "react-bootstrap"; // Added Pagination
import { useAuth } from "../../../../contexts/AuthContext";
import { format } from "date-fns";
import customerService from "../../../../services/customer.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";

function CustomersList() {
  // Create the customers state to store the customer data
  const [customers, setCustomers] = useState([]);
  // A state that serves as a flag to show the error message
  const [apiError, setApiError] = useState(false);
  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    setApiError(false);
    setApiErrorMessage(null);
    if (!token) return;

    const fetchCustomers = async () => {
      try {
        const response = await customerService.getAllCustomers(token);
        if (!response.ok) {
          setApiError(true);
          if (response.status === 401) {
            setApiErrorMessage("Unauthorized. Please log in again.");
          } else if (response.status === 403) {
            setApiErrorMessage(
              "You don't have the necessary permissions to view this page."
            );
          } else {
            setApiErrorMessage("An error occurred while fetching the data.");
          }
        } else {
          const data = await response.json();
          setCustomers(data.data);
          setLoading(false);
        }
      } catch (err) {
        setApiError(true);
        setApiErrorMessage("Failed to fetch customers.");
      }
    };

    fetchCustomers();
  }, [token]);

  const navigate = useNavigate();

  // Customer edit function
  const handleEdit = (customerData) => {
    // Redirect to Edit page with customerId
    navigate(`/admin/edit-customer/${customerData?.customer_id}`, {
      state: { customerData },
    });
  };

  // customer Detail function
  const handleDetail = (customer) => {
    // Redirect to CustomerDetail page with customerId
    navigate(`/admin/customer-detail/${customer.customer_id}`, {
      state: { customer },
    });
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.customer_first_name.toLowerCase().includes(searchLower) ||
      customer.customer_last_name.toLowerCase().includes(searchLower) ||
      customer.customer_email.toLowerCase().includes(searchLower) ||
      customer.customer_phone_number.toLowerCase().includes(searchLower)
    );
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalCustomers = filteredCustomers.length;
  const totalPages = Math.ceil(totalCustomers / itemsPerPage);

  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Handle page change
  const handlePaginationChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

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
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Customers</h2>
              {/* Search Input Field */}
              <Form.Control
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: "20px" }}
              />
            </div>

            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" style={{ color: "#081847" }} size="lg" />
                <p>Loading customers...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table striped bordered hover className="orders-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added Date</th>
                      <th>Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.map((customer) => (
                      <tr key={customer.customer_id}>
                        <td>{customer.customer_id}</td>
                        <td>{customer.customer_first_name}</td>
                        <td>{customer.customer_last_name}</td>
                        <td>{customer.customer_email}</td>
                        <td>{customer.customer_phone_number}</td>
                        <td>
                          {format(
                            new Date(customer.customer_added_date),
                            "MM/dd/yyyy | kk:mm"
                          )}
                        </td>
                        <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                        <td>
                          <div className="edit-delete-icons">
                            <Button variant="" onClick={() => handleEdit(customer)}>
                              <FontAwesomeIcon icon={faEdit} />{" "}
                              {/* Edit icon */}
                            </Button>{" "}
                            <Button variant="" onClick={() => handleDetail(customer)}>
                              <FontAwesomeIcon icon={faExternalLinkAlt} />{" "}
                              {/* View icon */}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="pagination-container text-center">
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePaginationChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="custom-pagination"
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePaginationChange(index + 1)}
                    className="custom-pagination"
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePaginationChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="custom-pagination"
                />
              </Pagination>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CustomersList;
