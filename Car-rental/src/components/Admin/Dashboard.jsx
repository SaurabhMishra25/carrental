import React from 'react'
import useFetchCollection from '../../customhook/useFetchCollection'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const {data:brands}=useFetchCollection("brands")
    const {data:models}=useFetchCollection("models")
    const {data:booking}=useFetchCollection("bookings")
    const rentals = booking.filter(item=>item.bookingStatus != 'Done')
    const {data:allusers}=useFetchCollection("users")
    const users = allusers.filter(item=>item.role != '0')
  return (
    <>
    {/*  <!-- Page Heading --> */}
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                          </div>

                      {/*  <!-- Content Row --> */}
                      <div className="row">

                          {/*  <!-- Earnings (Monthly) Card Example --> */}
                          <div className="col-xl-3 col-md-6 mb-4" style={{height:'150px'}}>
                              <div className="card border-left-primary shadow h-100 py-2">
                                  <div className="card-body">
                                      <div className="row no-gutters align-items-center">
                                          <div className="col mr-2">
                                              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                 Brands</div>
                                              <div className="h5 mb-0 font-weight-bold text-gray-800">{brands.length}</div>
                                          </div>
                                          <div className="col-auto">
                                              <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                          </div>
                                      </div>
                                      <div class="d-grid gap-2 mt-3">
                                        <Button as={Link} to='/admin/viewbrand' type="button" class="btn btn-primary" >
                                            View
                                        </Button>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/*  <!-- Earnings (Monthly) Card Example --> */}
                          <div className="col-xl-3 col-md-6 mb-4">
                              <div className="card border-left-success shadow h-100 py-2">
                                  <div className="card-body">
                                      <div className="row no-gutters align-items-center">
                                          <div className="col mr-2">
                                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                  Models</div>
                                              <div className="h5 mb-0 font-weight-bold text-gray-800">{models.length}</div>
                                          </div>
                                          <div className="col-auto">
                                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                          </div>
                                      </div>
                                      <div class="d-grid gap-2 mt-3">
                                        <Button as={Link} to='/admin/viewmodel' type="button" class="btn btn-success" >
                                            View
                                        </Button>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/*  <!-- Earnings (Monthly) Card Example --> */}
                          <div className="col-xl-3 col-md-6 mb-4">
                              <div className="card border-left-info shadow h-100 py-2">
                                  <div className="card-body">
                                      <div className="row no-gutters align-items-center">
                                          <div className="col mr-2">
                                              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Rentals
                                              </div>
                                              <div className="row no-gutters align-items-center">
                                                  <div className="col-auto">
                                                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{rentals.length}</div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="col-auto">
                                              <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                          </div>
                                      </div>
                                      <div class="d-grid gap-2 mt-3">
                                        <Button as={Link} to='/admin/rentals' type="button" class="btn btn-info" >
                                            View
                                        </Button>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/*  <!-- Pending Requests Card Example --> */}
                          <div className="col-xl-3 col-md-6 mb-4">
                              <div className="card border-left-warning shadow h-100 py-2">
                                  <div className="card-body">
                                      <div className="row no-gutters align-items-center">
                                          <div className="col mr-2">
                                              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                  Users </div>
                                              <div className="h5 mb-0 font-weight-bold text-gray-800">{users.length}</div>
                                          </div>
                                          <div className="col-auto">
                                              <i className="fas fa-comments fa-2x text-gray-300"></i>
                                          </div>
                                      </div>
                                      <div class="d-grid gap-2 mt-3">
                                        <Button as={Link} to='/admin' type="button" class="btn btn-warning" >
                                            View
                                        </Button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                

 </>
  )
}

export default Dashboard