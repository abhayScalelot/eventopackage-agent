import React, { useEffect, useRef } from "react";
import logoImage from "../../assest/svg/logo.svg";
import userImage from "../../assest/images/userdefault.jpg";

import { Link, Route, Routes, useNavigate, NavLink } from "react-router-dom";

import Profile from "../../Pages/Profile/Profile";
import { toast, ToastContainer } from "react-toastify";
import { s3Url } from "../../config";

import { removeToken, useUser } from "../auth/authSlice";
import { useDispatch } from "react-redux";
import {
  getProfileDetails,
  useProfileDetails,
} from "../../Pages/Profile/profileSlice";


import Organizers from "../../Pages/Organizers/Organizers";

const SideBar = () => {
  const dispatch = useDispatch();
  const profileDetails = useProfileDetails();


  const navigate = useNavigate();
  const { user } = useUser();
  const token = user?.token || null;
  let isToggleSidebar = useRef(false)
  const getProfile = async () => {
    try {
      await dispatch(getProfileDetails()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (token == null) return navigate("/");
  }, []);

  const handleLogout = () => {
    dispatch(removeToken());
    localStorage.clear();
    toast.success(`Logout Successfully.`);

  };

  const removeId = () => {
    localStorage.removeItem("eventId");
    localStorage.removeItem("displayName");
    localStorage.removeItem("stepCount");
  };

  const toggleSidebar = () => {
    isToggleSidebar.current = !isToggleSidebar.current
    if (isToggleSidebar.current) {
      document.querySelector(".app")?.classList.add("sidenav-toggled-open");
    } else {
      document.querySelector(".app")?.classList.remove("sidenav-toggled-open");
    }
  };

  const Outhover = () => {
    isToggleSidebar.current = false
    document.querySelector(".app")?.classList.remove("sidenav-toggled-open");
  };

  return (
    <div className="main flex min-h-screen relative">
      {/* <!-- Left Panel -->*/}
      <div className="leftPanel max-w-[230px] w-full  bg-white fixed shadow-md max-[768px]:top-[75px] z-30">
        <div className="logo text-center px-4 pt-5 pb-8 max-[768px]:py-2 max-[768px]:px-6">
          <Link to="/" className="block max-[768px]:w-24">
            <img
              src={logoImage}
              alt="Evento Package Logo"
              className="max-w-full w-auto mx-auto"
            />
          </Link>
        </div>
        <div className="nav">
          <NavLink
            to="../organizers"
            activeclassname="active"
            title="Organizers"
            onClick={removeId}
          >
            <span>
              <i className="w-6 block text-center text-lg icon-deshbord"></i>
            </span>
            <span>Organizers</span>
          </NavLink>

        </div>
      </div>
      {/* <!-- Content --> */}
      <div className="w-full">
        {/* <!-- Top Header --> */}
        <div className="w-[calc(100%-230px)] z-10  max-[768px]:w-full ml-[230px] max-[768px]:ml-[0] bg-white max-[550px]:px-3.5 py-3.5 px-6 xl:px-12 flex flex-wrap items-center fixed shadow-sm">
          {/* <!-- Search Box --> */}
          <button
            className="px-3.5 max-[550px]:px-2 menu-toggle min-[769px]:hidden"
            // onMouseOver={() => Onhover()}
            onMouseOut={() => Outhover()}
            onClick={() => { toggleSidebar(); }}
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
              className="block hover:fill-spiroDiscoBall anim"
            >
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                // fill="#000000"
                stroke="none"
              >
                <path d="M799 3906 c-56 -20 -96 -53 -126 -104 -24 -40 -28 -58 -28 -123 0 -67 4 -81 30 -125 19 -30 49 -60 79 -79 l49 -30 1757 0 1757 0 49 30 c30 19 60 49 79 79 27 44 30 58 30 126 0 68 -3 82 -30 126 -19 30 -49 60 -79 79 l-49 30 -1741 2 c-1406 2 -1748 0 -1777 -11z" />
                <path d="M799 2786 c-56 -20 -96 -53 -126 -104 -24 -40 -28 -58 -28 -123 0 -67 4 -81 30 -125 19 -30 49 -60 79 -79 l49 -30 1757 0 1757 0 49 30 c30 19 60 49 79 79 27 44 30 58 30 126 0 68 -3 82 -30 126 -19 30 -49 60 -79 79 l-49 30 -1741 2 c-1406 2 -1748 0 -1777 -11z" />
                <path d="M799 1666 c-56 -20 -96 -53 -126 -104 -24 -40 -28 -58 -28 -123 0 -67 4 -81 30 -125 19 -30 49 -60 79 -79 l49 -30 1757 0 1757 0 49 30 c30 19 60 49 79 79 27 44 30 58 30 126 0 68 -3 82 -30 126 -19 30 -49 60 -79 79 l-49 30 -1741 2 c-1406 2 -1748 0 -1777 -11z" />
              </g>
            </svg>
          </button>

          <div className="w-72 max-[768px]:w-50 max-[550px]:w-40 max-[400px]:w-32 relative bg-brightGray rounded-md flex items-center">
            <input
              type="text"
              name=""
              id=""
              placeholder={`SEARCH`}
              className="w-full h-10 bg-transparent text-sm font-bold pl-3.5 focus:outline-none"
            />
            <button type="submit" className="p-3.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.80624 7.7457C9.39675 6.93931 9.74996 5.9488 9.74996 4.87502C9.74996 2.18703 7.56294 0 4.87497 0C2.18699 0 0 2.18703 0 4.87502C0 7.56301 2.18701 9.75004 4.87499 9.75004C5.94877 9.75004 6.93936 9.39678 7.74575 8.80627L10.9395 12L12 10.9395C12 10.9394 8.80624 7.7457 8.80624 7.7457ZM4.87499 8.25002C3.01391 8.25002 1.50001 6.73611 1.50001 4.87502C1.50001 3.01393 3.01391 1.50001 4.87499 1.50001C6.73607 1.50001 8.24997 3.01393 8.24997 4.87502C8.24997 6.73611 6.73605 8.25002 4.87499 8.25002Z"
                  fill="#9BA0A8"
                />
              </svg>
            </button>
          </div>

          {/* <!-- Right Bar --> */}
          <div className="ml-auto">
            <div className="flex items-center space-x-6">
              <div className="block por">
                <img
                  src={
                    profileDetails && profileDetails?.profile_pic !== ""
                      ? s3Url + "/" + profileDetails?.profile_pic
                      : userImage
                  }
                  alt="user name"
                  className="w-12 h-12 object-cover rounded-2xl relative"
                />
                <div className="dropprofile absolute pt-2.5 right-12 translate-y-5 opacity-0 anim invisible ">
                  <div className="profile-dropdown border-[#eee] border rounded bg-white relative px-2.5 py-[15px]">
                    <div
                      onClick={() => {
                        navigate("../profile");
                      }}
                      // to="profile"
                      className="text-xs flex items-center hover:text-spiroDiscoBall cursor-pointer mb-4"
                    >
                      <i className="w-6 block text-center text-lg icon-user mr-4"></i>
                      <span className="font-bold font-primary leading-4">
                        View Profile
                      </span>
                    </div>
                    <div
                      className="text-xs flex items-center cursor-pointer text-[#FE4D5F]"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <i className="w-6 block text-center text-lg icon-logout mr-4"></i>
                      <span className="font-bold font-primary leading-4">
                        Sign Out
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Content In --> */}
        <div className="rightInContent max-[768px]:ml-[0]">
          <Routes>
            <Route path="organizers">
              <Route index element={<Organizers />} />
            </Route>
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default SideBar;
