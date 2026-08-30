import React from "react";
import "@flaticon/flaticon-uicons/css/all/all.css";
import { Link } from "react-router";

function AdminComponent() {
  return (
    <section className="services-section">
      <div className="auto-container">
        <div className="sec-title style-two">
          <h2>Admin Dashboard</h2>
        </div>
        <div className="row">
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/orders">
              <div className="inner-box hvr-float-shadow">
                <h5>Open for all</h5>
                <h2>All Orders</h2>
                <a href="#" className="read-more">
                  LIST OF ORDERS +
                </a>
                <div className="icon">
                  <span className="fi fi-rr-document"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/order">
              <div className="inner-box hvr-float-shadow">
                <h5> OPEN FOR LEADS</h5>
                <h2>ADD ORDERS</h2>
                <a href="#" className="read-more">
                  ADD ORDER +
                </a>
                <div className="icon">
                  <span className="fi fi-rr-file-edit"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/employees">
              <div className="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMINS</h5>
                <h2>Employee</h2>
                <a href="#" className="read-more">
                  LIST OF EMPLOYEES +
                </a>
                <div className="icon">
                  <span className="fi fi-rr-users"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/add-employee">
              <div className="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMIN</h5>
                <h2>Add Employee</h2>
                <a href="#" className="read-more">
                  Add Employee +
                </a>
                <div className="icon">
                  <span className="fi fi-rr-user"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/customers">
              <div className="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMINS</h5>
                <h2>Customers</h2>
                <a href="#" className="read-more">
                  LIST OF CUSTOMERS +
                </a>
                <div className="icon">
                  <span className="fi fi-rr-users-alt"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/add-customer">
              <div className="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMINS</h5>
                <h2>Add Customer</h2>
                <a href="#" className="read-more">
                  Add Customer
                </a>
                <div className="icon">
                  <span className="fi fi-rr-user"></span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 service-block-one">
            <Link to="/admin/services">
            
            <div className="inner-box hvr-float-shadow">
              <h5>OPEN FOR ADMINS</h5>
              <h2>Services</h2>
              <a href="#" className="read-more">
                Services
              </a>
              <div className="icon">
                <span className="flaticon-spray-gun"></span>
              </div>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminComponent;
