import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navBar/Navbar";
import CheckOutPage from "../pages/checkOutPage/CheckOutPage";
import DisplayItemPage from "../pages/displayItemPage/DisplayItemPage";
import MainPage from "../pages/homePage/MainPage";
import ProductOrderPage from "../pages/productOrderPage/ProductOrderPage";

const Routing = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/displayItemPage" element={<DisplayItemPage />} />
        <Route path="/productOrderPage/:id" element={<ProductOrderPage />} />
        <Route path="/checkOutPage" element={<CheckOutPage />} />
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
