import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import About from "./components/About";
import Cars from "./components/Cars";
import Services from "./components/Services";
import Policy from "./components/Policy";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";
import { AdminLayout, ProtectedAdmin,UserLayout } from "./components/hiddenlinks";
import Dashboard from "./components/Admin/Dashboard";
import AdminHeader from "./components/Admin/AdminHeader";
import AddCar from "./components/Admin/Car/AddCar";
import AddBrand from "./components/Admin/AddBrand";
import ViewBrand from "./components/Admin/ViewBrand";
import AddModel from "./components/Admin/AddModel";
import ViewModel from "./components/Admin/ViewModel";
import ViewCar from "./components/Admin/Car/ViewCar";
import CarDetails from "./components/CarDetails";
import Rent from "./components/Rent";
import FilterCars from "./components/FilterCars";
import BookingDetails from "./components/BookingDetails";
import BookingPayment from "./components/BookingPayment";
import Rentals from "./components/Admin/Rentals";
import MyBookings from "./components/MyBookings ";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <UserLayout> <Home/> </UserLayout> },
        { path:"about", element:<UserLayout> <About/> </UserLayout>},
        { path:"cars", element:<UserLayout> <Cars/> </UserLayout>},
        { path:"services", element:<UserLayout> <Services/> </UserLayout>},
        { path:"policy", element:<UserLayout> <Policy/> </UserLayout>},
        { path:"contact", element:<UserLayout> <Contact/> </UserLayout>},
        { path:"login", element:<Login/>},
        { path:"register", element:<Register/>},
        { path:"car-details/:id", element:<UserLayout> <CarDetails/> </UserLayout>},
        {path:"rent",element:<Rent/>},
        {path:"filtercars",element:<UserLayout><FilterCars/></UserLayout>},
        {path:"booking",element:<UserLayout><BookingDetails/></UserLayout>},
        {path:"bookingpayment",element:<UserLayout><BookingPayment/></UserLayout>},
        {path:'mybookings',element:<UserLayout><MyBookings/></UserLayout>},
        {path:"admin" , element:<AdminLayout/>,
      children:[
          {path:'',element:<Dashboard/>},  
          { path:"addbrand",element:<AddBrand/>},
          { path:"viewbrand", element:<ViewBrand/>},
          { path:"editbrand/:id",element:<AddBrand/>},
          { path:"addmodel",element:<AddModel/>},
          { path:"viewmodel", element:<ViewModel/>},
          { path:"editmodel/:id",element:<AddModel/>},
          {path:'addcar',element:<AddCar/>},
          {path:'viewcar',element:<ViewCar/>},
          {path:"editcar/:id",element:<AddCar/>},
          {path:'rentals',element:<Rentals/>},
      ]},
      
        { path:'*', element:<PageNotFound/>}
      ],
    },
  ]);

  export default router