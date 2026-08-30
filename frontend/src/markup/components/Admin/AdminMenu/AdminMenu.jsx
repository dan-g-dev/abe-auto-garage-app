import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiCarProfileBold } from "react-icons/pi";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import React from "react";
import { VscPersonAdd } from "react-icons/vsc";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { MdOutlineCarCrash } from "react-icons/md";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { GiHomeGarage } from "react-icons/gi";
import { GiMechanicGarage } from "react-icons/gi";
//import link from react router
import { Link } from "react-router-dom";

function AdminMenu(props) {
  return (
    <div>
      <div className="admin-menu">
        <h2>Admin Menu</h2>
      </div>
      <div className="list-group">
        <Link to="/admin" className="list-group-item">
          {" "}
          <MdOutlineAdminPanelSettings size={30} /> Dashboard
        </Link>
        <Link to="/admin/orders" className="list-group-item">
          {" "}
          <MdOutlineCarCrash size={30}/> Orders
        </Link>
        <Link to="/admin/order" className="list-group-item">
          {" "}
          <GiHomeGarage size={30} /> New order
        </Link>
        <Link to="/admin/add-employee" className="list-group-item">
          <VscPersonAdd size={30} /> Add employee
        </Link>
        <Link to="/admin/employees" className="list-group-item">
          <MdOutlinePeopleAlt size={30} /> Employees
        </Link>
        <Link to="/admin/add-customer" className="list-group-item">
          {" "}
          <MdOutlinePersonAddAlt1 size={30} />
          Add Customer
        </Link>
        <Link to="/admin/customers" className="list-group-item">
          <SlPeople size={30} /> Customers
        </Link>
        <Link to="/admin/services" className="list-group-item">
          <GiMechanicGarage size={30} /> Services
        </Link>
      </div>
    </div>
  );
}

export default AdminMenu;
