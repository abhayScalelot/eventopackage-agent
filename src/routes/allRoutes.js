import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "../component/auth/Login";
import Register from "../component/auth/Register";
import Otp from "../component/auth/Otp";
import ForgetPassword from "../component/auth/ForgetPassword";
import NewPassword from "../component/auth/NewPassword";
import RequireAuth from "../component/auth/RequiredAuth";
import SideBar from "../component/sidebar/SideBar";


const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes className="main min-h-screen w-full">
        <Route path="/">
        
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify/:username/:flag" element={<Otp />} />
            <Route path="forgot-password" element={<ForgetPassword />} />
            <Route path="new-password/:username" element={<NewPassword />} />
          
          <Route element={<RequireAuth />}>
            <Route path="/*" element={<SideBar />} />
          </Route>
          <Route
            path="*"
            element={
              <h1 style={{ color: "red", margin: "50px" }}>
                404 | PAGE NOT FOUND
              </h1>
            }
          />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
