import React, { useEffect } from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
//import useLocation hook
import { useLocation, useParams } from "react-router-dom";
import CustomerDetailComponent from "../../components/Admin/CustomerDetailComponent/CustomerDetailComponent";

function CustomerDetail() {
  //Extract the dynamic `id` from the URL
  const { id } = useParams();
  //Get the passed state (employee data)
  const { state } = useLocation();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerDetailComponent customerData={state?.customer} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;
