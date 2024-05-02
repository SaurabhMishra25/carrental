import React from 'react'
import './AdminHeader.css'
import Footer from './Footer'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../assets/admin/vendor/fontawesome-free/css/all.min.css'
import "../../assets/admin/css/sb-admin-2.css"
import {Outlet} from 'react-router-dom'

const AdminHeader = () => {
  return (
    <div id="page-top">
        <div id="wrapper">
             <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                     <Navbar/>
                    <div className="container col-11">
                        <Outlet/></div>
                </div>
                <Footer/>
            </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
        </a>

        {/*  <!-- Logout Modal--> */}
        {/* <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <button className="btn btn-primary"><Logout/></button>
                    </div>
                </div>
            </div>
        </div> */}
    </div>
  )
}

export default AdminHeader