import { useState } from "react";
import "./App.css";
//import the Route and Routes components from
import { Route, Routes } from "react-router-dom";
//import the page components
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import Unauthorized from "./markup/pages/Unauthorized";
//Import the Orders and Customers component
import Orders from "./markup/pages/admin/Orders";
import Customers from "./markup/pages/admin/Customers";
//Import the employees component
import Employees from "./markup/pages/admin/Employees";
//Import the EditEmployee component
import EditEmployee from "./markup/pages/admin/EditEmployee";
//Import the css file
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
//Import the custom css
import "./assets/styles/custom.css";
//Import Bootstrap's JS bundle so data-bs-toggle (the mobile nav collapse) works
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//Import the header component
import Header from "./markup/components/Header/Header";
// Import the footer component
import Footer from "./markup/components/Footer/Footer";
//Import the PrivateAuthRoute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import AddCustomer from "./markup/pages/admin/AddCustomer";
import CustomerDetail from "./markup/pages/admin/CustomerDetail";
import EditCustomer from "./markup/pages/admin/EditCustomer";
import Service from "./markup/pages/admin/Service";
import AddNewOrder from "./markup/pages/admin/AddNewOrder";
import Admin from "./markup/pages/admin/Admin";
import EditOrder from "./markup/pages/admin/EditOrder";
import About from "./markup/pages/About";
import Services from "./markup/pages/Services";
import Contact from "./markup/pages/Contact";
import TrackOrder from "./markup/pages/TrackOrder";
function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Add the Orders Route */}
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Admin />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddNewOrder />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Service />
            </PrivateAuthRoute>
          }
        />

        {/* Add the Customers Route */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        {/* Add the add-customer Route */}
        <Route
          path="/admin/customer-detail/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerDetail />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/edit-customer/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        {/* Add the add-customer Route */}
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/edit-order/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditOrder />
            </PrivateAuthRoute>
          }
        />

        {/* Add the Employees Route */}
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        {/* Add the edit-employee Route */}
        <Route
          path="/admin/edit-employee/:id"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditEmployee />
            </PrivateAuthRoute>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-order" element={<TrackOrder />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
