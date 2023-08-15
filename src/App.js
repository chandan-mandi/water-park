import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminRoute from './components/AdminRoute/AdminRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthProvider from './hooks/AuthProvider';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Toaster from 'react-hot-toast';

const Home = lazy(() => import('./pages/Home/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login/Login'));
const Signup = lazy(() => import('./pages/Login/SignUp/Signup'));
const Payment = lazy(() => import('./components/UserDashboard/Payment/Payment'));
const PackageBooking = lazy(() => import('./pages/PackageBooking/PackageBooking'));
const Update = lazy(() => import('./components/UserDashboard/Update/Update'));
const Rides = lazy(() => import('./pages/Home/Rides/Rides/Rides'));
const RideBooking = lazy(() => import('./components/RideBooking/RideBooking'));
const Contact = lazy(() => import('./pages/Home/Contact/Contact'));
const About = lazy(() => import('./pages/Home/About/About'));
const MyOrders = lazy(() => import('./components/UserDashboard/MyOrders/MyOrders'));
const ManageAllProduct = lazy(() => import('./components/UserDashboard/ManageAllProduct/ManageAllProduct'));
const SendReview = lazy(() => import('./components/UserDashboard/SendReview/SendReview'));
const ManageAllBooking = lazy(() => import('./components/UserDashboard/ManageAllBooking/ManageAllBooking'));
const AddProduct = lazy(() => import('./components/UserDashboard/AddProduct/AddProduct'));
const MakeAdmin = lazy(() => import('./components/UserDashboard/MakeAdmin/MakeAdmin'));
const MainDashboard = lazy(() => import('./components/MainDashboard/MainDashboard'));
const AddBlog = lazy(() => import('./components/UserDashboard/AddBlog/AddBlog'));
const FullBlog = lazy(() => import('./pages/Home/FullBlog/FullBlog'));
const Membership = lazy(() => import('./pages/Home/Membership/Membership'));


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/membership" element={<Membership />} />
            <Route path={`/blogs/:blogId`} element={<FullBlog />} />
            <Route path={`/booking/:id`} element={<PrivateRoute> <PackageBooking /></PrivateRoute>} />
            <Route path={`/ridebooking/:id`} element={<PrivateRoute> <RideBooking /></PrivateRoute>} />
            <Route exact path={`/dashboard`} element={<PrivateRoute><MainDashboard /> </PrivateRoute>}>
              <Route path={`/dashboard/myBookings`} element={<MyOrders />}> </Route>
              <Route path={`/dashboard/sendReview`} element={<SendReview />}> </Route>
              <Route path={`/dashboard/payment`} element={<Payment />}> </Route>
              <Route path={`/dashboard/manageAllBooking`} element={<AdminRoute><ManageAllBooking /></AdminRoute>}> </Route>
              <Route path={`/dashboard/addRide`} element={<AdminRoute><AddProduct /> </AdminRoute>}> </Route>
              <Route path={`/dashboard/makeAdmin`} element={<AdminRoute><MakeAdmin /></AdminRoute>}> </Route>
              <Route path={`/dashboard/manageAllRides`} element={<AdminRoute><ManageAllProduct /></AdminRoute>}> </Route>
              <Route path={`/dashboard/manageAllRides/update/:id`} element={<AdminRoute><Update /></AdminRoute>}> </Route>
              <Route path={`/dashboard/addBlog`} element={<AdminRoute><AddBlog /></AdminRoute>}> </Route>
              <Route path={`/dashboard/manageAllRides/update/:id`} element={<AdminRoute><Update /></AdminRoute>}> </Route>
            </Route>
            <Route path="rides" element={<Rides />} />
          </Routes>
          {/* <Toaster /> */}
        </Suspense>
      </AuthProvider>
    </div>
  )
}

export default App;
