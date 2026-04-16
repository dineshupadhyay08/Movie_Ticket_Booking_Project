import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MoviesDetails from "./pages/MoviesDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import {Toaster} from "react-hot-toast";
import Footer from "./components/Footer";

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<h1><Home /></h1>} />
        <Route path="/movies" element={<h1><Movies /></h1>} />
        <Route path="/movies/:id" element={<h1><MoviesDetails /></h1>} />
        <Route path="/movies/:id/:data" element={<h1><SeatLayout /></h1>} />
        <Route path="/my-bookings" element={<h1><MyBookings /></h1>} />
        <Route path="/favorite" element={<h1><Favorite /></h1>} />
      </Routes>
      {/* {isAdminRoute && <Footer />} */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
