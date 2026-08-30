import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomersList from "../../components/Admin/CustomersList/CustomersList";

function Customers() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <CustomersList />
        </div>
      </div>
    </div>
  );
}

export default Customers;
