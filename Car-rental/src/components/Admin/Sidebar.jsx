import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion  ");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled  ");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion  ")
        }
    };
  return (
    <ul className={style} id="accordionSidebar">

                {/*  <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-car"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Car Rental</div>
                    <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                </div>
                </a>

                {/*   <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/*  <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>

                {/*  <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                      <i class="fas fa-car"></i>
                        <span>Brand</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/admin/AddBrand">Add</Link>
                            <Link className="collapse-item" to='/admin/viewbrand'>View </Link>
                        </div>
                    </div>
                </li>

                  


                {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Models</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                        data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to='/admin/addmodel'>Add</Link>
                            <Link className="collapse-item" to='/admin/viewmodel'>View</Link>
                        </div>
                    </div>
                </li>

                {/* <!-- Nav Item - Charts --> */}
                <li className="nav-item">
                    <Link className="nav-link" to='/admin/viewcar'>
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>View Cars</span></Link>
                </li>

                {/*  <!-- Divider --> */}
                {/* <hr className="sidebar-divider" /> */}

                {/* <!-- Heading --> */}
                {/* <div className="sidebar-heading">
                    Addons
                </div> */}

                {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages"
                        aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Login Screens:</h6>
                            <a className="collapse-item" href="login.html">Login</a>
                            <a className="collapse-item" href="register.html">Register</a>
                            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                            <div className="collapse-divider"></div>
                            <h6 className="collapse-header">Other Pages:</h6>
                            <a className="collapse-item" href="404.html">404 Page</a>
                            <a className="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                </li> */}

              
                {/*  <!-- Nav Item - Tables --> */}
                <li className="nav-item">
                    <Link className="nav-link" to='/admin/rentals'>
                        <i className="fas fa-fw fa-table"></i>
                        <span>Orders</span></Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
  )
}

export default Sidebar