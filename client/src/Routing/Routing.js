import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navBar/Navbar";
import CheckOutPage from "../pages/checkOutPage/CheckOutPage";
import DisplayItemPage from "../pages/displayItemPage/DisplayItemPage";
import MainPage from "../pages/homePage/MainPage";
import ProductOrderPage from "../pages/productOrderPage/ProductOrderPage";
import SignIn from "../pages/auth/signIn/SignIn";
import SignUp from "../pages/auth/signUp/SignUp";
import ForgetPassword from "../pages/auth/forgetPassword/ForgetPassword";
import ProductForm from "../pages/ProductForm/ProductForm";
import MyProducts from "../pages/myProducts/MyProducts";
import SuccessPayment from "../pages/successPayment/SuccessPayment";
import CancelPayment from "../pages/cancelPayment/CancelPayment";
import SendPasswordRecoveryEmail from "../pages/auth/sendPasswordRecoveryEmail/sendPasswordRecoveryEmail";
import Footer from "../components/footer/Footer";
import Navbar1 from "../components/navBar/Navbar1";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/slicers/authSlice";
import { Navigate } from "react-router-dom";
const Routing = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Router>
      <Navbar />
      {/* <Navbar1 /> */}
      <Routes>
        <Route path="/search" element={<DisplayItemPage />} />
        <Route
          path="/myProducts"
          element={isAuthenticated ? <MyProducts /> : <Navigate to="/signIn" />}
        />
        <Route path="/productOrderPage/:id" element={<ProductOrderPage />} />
        <Route path="/checkOutPage" element={<CheckOutPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/forgetPassword"
          element={
            isAuthenticated ? <ForgetPassword /> : <Navigate to="/signIn" />
          }
        />
        <Route
          path="/productForm"
          element={
            isAuthenticated ? <ProductForm /> : <Navigate to="/signIn" />
          }
        />
        <Route
          path="/productEditForm/:id"
          element={
            isAuthenticated ? <ProductForm /> : <Navigate to="/signIn" />
          }
        />
        <Route path="/successPayment" element={<SuccessPayment />} />
        <Route path="/cancelPayment" element={<CancelPayment />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<ForgetPassword />}
        />
        <Route
          path="/sendRecoveryEmail"
          element={<SendPasswordRecoveryEmail />}
        />
        <Route
          path="/editProfile/:userId/:token"
          element={isAuthenticated ? <SignUp /> : <Navigate to="/signIn" />}
        />
        <Route path="/" element={<MainPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

// export default Routing;
{
  /* <PrivateRoute
          path="/myProducts"
          element={<MyProducts />}
          isAuthenticated={isAuthenticated}
        /> */
}
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import your route components too

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />}>
//         <Route index element={<Home />} />
//         <Route path="teams" element={<Teams />}>
//           <Route path=":teamId" element={<Team />} />
//           <Route path="new" element={<NewTeamForm />} />
//           <Route index element={<LeagueStandings />} />
//         </Route>
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );
// Import the PrivateRoute component
// import PrivateRoute from "./PrivateRoute";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "../components/navBar/Navbar";
// import CheckOutPage from "../pages/checkOutPage/CheckOutPage";
// import DisplayItemPage from "../pages/displayItemPage/DisplayItemPage";
// import MainPage from "../pages/homePage/MainPage";
// import ProductOrderPage from "../pages/productOrderPage/ProductOrderPage";
// import SignIn from "../pages/auth/signIn/SignIn";
// import SignUp from "../pages/auth/signUp/SignUp";
// import ForgetPassword from "../pages/auth/forgetPassword/ForgetPassword";
// import ProductForm from "../pages/ProductForm/ProductForm";
// import MyProducts from "../pages/myProducts/MyProducts";
// import SuccessPayment from "../pages/successPayment/SuccessPayment";
// import CancelPayment from "../pages/cancelPayment/CancelPayment";
// import SendPasswordRecoveryEmail from "../pages/auth/sendPasswordRecoveryEmail/sendPasswordRecoveryEmail";
// import Footer from "../components/footer/Footer";
// import Navbar1 from "../components/navBar/Navbar1";
// import { useSelector } from "react-redux";
// import { selectIsAuthenticated } from "../redux/slicers/authSlice";

// const Routing = () => {
//   const isAuthenticated = useSelector(selectIsAuthenticated);

//   return (
//     <Router>
//       <Navbar />
//       {/* <Navbar1 /> */}
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/search" element={<DisplayItemPage />} />
//         <Route path="/signIn" element={<SignIn />} />
//         <Route path="/signUp" element={<SignUp />} />
//         <Route path="/forgetPassword" element={<ForgetPassword />} />
//         <Route
//           path="/reset-password/:userId/:token"
//           element={<ForgetPassword />}
//         />
//         <Route
//           path="/sendRecoveryEmail"
//           element={<SendPasswordRecoveryEmail />}
//         />
//         <Route path="/" element={<MainPage />} />

//         {/* Private Routes
//         <PrivateRoute
//           path="/myProducts"
//           element={<MyProducts />}
//           isAuthenticated={isAuthenticated}
//         />
//         <PrivateRoute
//           path="/productOrderPage/:id"
//           element={<ProductOrderPage />}
//           isAuthenticated={isAuthenticated}
//         />
//         <PrivateRoute
//           path="/checkOutPage"
//           element={<CheckOutPage />}
//           isAuthenticated={isAuthenticated}
//         />
//         <PrivateRoute
//           path="/productForm"
//           element={<ProductForm />}
//           isAuthenticated={isAuthenticated}
//         />
//         <PrivateRoute
//           path="/productEditForm/:id"
//           element={<ProductForm />}
//           isAuthenticated={isAuthenticated}
//         />
//         <PrivateRoute
//           path="/successPayment"
//           element={<SuccessPayment />}
//           isAuthenticated={isAuthenticated}
//         />
//         <PrivateRoute
//           path="/cancelPayment"
//           element={<CancelPayment />}
//           isAuthenticated={isAuthenticated}
//         />
//         <PrivateRoute
//           path="/editProfile/:userId/:token"
//           element={<SignUp />}
//           isAuthenticated={isAuthenticated}
//         /> */}

//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

export default Routing;
