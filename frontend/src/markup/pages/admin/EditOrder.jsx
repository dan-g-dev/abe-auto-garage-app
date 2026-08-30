import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EditOrderComponent from "../../components/EditOrderComponent/EditOrderComponent";

function EditOrder() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <EditOrderComponent />
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
