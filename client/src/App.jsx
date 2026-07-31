import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MoviesDetails from "./pages/MoviesDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
// import {Toaster} from "react-hot-toast";
import Footer from "./components/Footer";
import Layout from "./pages/admin/Layout";
import AddShows from "./pages/admin/AddShows";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";
import Dashbooard from "./pages/admin/Dashbooard";
import Loading from "./components/Loading";
import { SignIn, useUser } from "@clerk/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Toaster /> */}
      <ToastContainer position="top-right" />
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MoviesDetails />} />
          <Route path="/movies/:id/:data" element={<SeatLayout />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/loading/:nextUrl" element={<Loading />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route
            path="/admin/*"
            element={
              !isLoaded ? (
                <div className="min-h-screen flex justify-center items-center">
                  <Loading />
                </div>
              ) : isSignedIn ? (
                <Layout />
              ) : (
                <div className="min-h-screen flex justify-center items-center">
                  <SignIn fallbackRedirectUrl={"/admin"} />
                </div>
              )
            }
          >
            <Route index element={<Dashbooard />} />
            <Route path="add-shows" element={<AddShows />} />
            <Route path="list-shows" element={<ListShows />} />
            <Route path="list-bookings" element={<ListBookings />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
