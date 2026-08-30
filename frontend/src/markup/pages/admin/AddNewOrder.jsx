import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import NewOrdersComponent from "../../components/Admin/NewOrdersComponent/NewOrdersComponent";

function AddNewOrder() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <NewOrdersComponent />
        </div>
      </div>
    </div>
  );
}

export default AddNewOrder;
