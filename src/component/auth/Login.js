import React, { useEffect, useState } from "react";
import googlelogo from "../../assest/images/landing-page/google.png";
import facebooklogo from "../../assest/images/landing-page/facebook.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BgImage from "./BgImage";
import { useDispatch } from "react-redux";
import { logInUser, useUser } from "./authSlice";
import { getProfileDetail } from "../../Pages/Profile/profileSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useUser();
  // const token = user.token || null;
  // console.log(token);

  // useEffect(() => {
  //   // if (token != null) return navigate("../../organizers");
  // }, [token]);

  const [userData, setUserData] = useState({ mobile: "", password: "" });
  const [error, setError] = useState(false);

  const setFormField = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let payload = Object.assign({}, userData);
      let response = await dispatch(logInUser(payload))
      console.log('response', response)
      if (response?.payload?.data?.IsSuccess) {
        if (response?.payload?.data?.Data?.key) {
          console.log("Key Maylii")
          navigate(`../verify/${userData.mobile}/${true})}`);
        } else if (response?.payload?.data?.Data?.token) {
          console.log("Token Mayluu")
          navigate("/organizers");
          toast.success(response?.payload?.data?.Message);
          setError(false);
        }
      } else {
        toast.error(response.data?.Message);
      }
    } catch (error) {
      toast.error('Username or Password Incorrect');
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-wrap bg-white">
        <BgImage />
        <div className="w-full relative lg:w-1/2 flex px-4">
          <div className="max-w-md w-full m-auto">
            <h1>Welcome Back!</h1>
            <p className="sm:text-lg xl:text-xl text-quicksilver font-normal sm:pt-3.5 xl:pr-8">
              Log in with your data that you entered during your registration
            </p>
            <div className="w-full pt-7 sm:pt-10">
              <form className="space-y-5">
                {error && (
                  <span style={{ color: "red" }}>
                    Username or Password incorrect
                  </span>
                )}
                <div>
                  {/* <label htmlFor="" className="input-titel">Email or Phone number</label> */}
                  <label htmlFor="" className="input-titel">
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="input_box"
                    value={userData.mobile}
                    onChange={(e) => {
                      setFormField("mobile", e.target.value);
                      setError(false);
                    }}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="" className="input-titel">
                    Password
                  </label>
                  <input
                    type="Password"
                    name="password"
                    className="input_box"
                    value={userData.password}
                    onChange={(e) => {
                      setFormField("password", e.target.value);
                      setError(false);
                    }}
                    required
                  />
                  <Link
                    to="../forgot-password"
                    className="text-caribbeanGreen font-bold text-xs md:text-sm block text-right mt-2"
                  >
                    Forget Password?
                  </Link>
                </div>
                <button
                  className="btn-primary w-full py-[15px] uppercase"
                  onClick={handleSubmit}
                >
                  Login Now
                </button>
                {/* <div type="button" className="relative py-5 sm:py-8">
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-brightGray"></span>
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max p-2 bg-white">
                    or
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="btn p-3 relative w-[48%] font-bold text-base text-japaneseIndigo border-2 border-[#D3DCEA] rounded"
                  >
                    <img
                      src={googlelogo}
                      className="absolute top-1/2 left-3.5 -translate-y-1/2"
                      alt="google"
                    />
                    Google
                  </button>
                  <button
                    type="button"
                    className="btn p-3 relative w-[48%] font-bold text-base text-japaneseIndigo border-2 border-[#D3DCEA] rounded"
                  >
                    <img
                      src={facebooklogo}
                      className="absolute top-1/2 left-3.5 -translate-y-1/2 w-4"
                      alt="google"
                    />
                    Facebook
                  </button>
                </div> */}
                <span className="block text-sm text-japaneseIndigo font-bold text-center">
                  Don’t have an account? <Link to="../register">Sign up</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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

export default Login;
