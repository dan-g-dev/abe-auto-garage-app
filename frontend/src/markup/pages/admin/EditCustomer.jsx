import React,{useEffect} from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import EditCustomerForm from '../../components/Admin/EditCustomerForm/EditCustomerForm';
//import the useParams and useLocation
import { useParams, useLocation } from 'react-router';
function EditCustomer() {
  //extract the dynamic 'id' from the useParams
  const {id} = useLocation()
  //extract the customer data from the state object
  const {state}  = useLocation()

  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          {/* Pass the state (employee data) to the EditEmployeeFrom component */}
         <EditCustomerForm customerData={state?.customer}/>
        </div>
      </div>
    </div>
  );
}

export default EditCustomer