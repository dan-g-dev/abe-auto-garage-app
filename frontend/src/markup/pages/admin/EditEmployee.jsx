import React, { useState, useEffect } from "react";
//import useParams
import { useParams, useLocation } from "react-router-dom";
//import AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EditEmployeeForm from "../../components/Admin/EditEmployeeForm/EditEmployeeForm";

function EditEmployee() {
  //Extract the dynamic `id` from the URL
  const { id } = useParams();
  //Get the passed state (employee data)
  const { state } = useLocation();

  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          {/* Pass the state (employee data) to the EditEmployeeFrom component */}
          <EditEmployeeForm employeeData={state?.employee} />
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
