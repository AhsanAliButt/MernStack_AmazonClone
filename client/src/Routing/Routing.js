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

const Routing = () => {
  return (
    <Router>
      <Navbar />
      {/* <Navbar1 /> */}
      <Routes>
        <Route path="/search" element={<DisplayItemPage />} />
        <Route path="/myProducts" element={<MyProducts />} />
        <Route path="/productOrderPage/:id" element={<ProductOrderPage />} />
        <Route path="/checkOutPage" element={<CheckOutPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/productEditForm/:id" element={<ProductForm />} />
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
        <Route path="/editProfile/:userId/:token" element={<SignUp />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Routing;

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
