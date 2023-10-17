import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navBar/Navbar";
import CheckOutPage from "../pages/checkOutPage/CheckOutPage";
import DisplayItemPage from "../pages/displayItemPage/DisplayItemPage";
import MainPage from "../pages/homePage/MainPage";
import ProductOrderPage from "../pages/productOrderPage/ProductOrderPage";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ProductForm from "../pages/ProductForm/ProductForm";

const Routing = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/search" element={<DisplayItemPage />} />

        <Route path="/productOrderPage/:id" element={<ProductOrderPage />} />
        <Route path="/checkOutPage" element={<CheckOutPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
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
