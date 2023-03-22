import React, { useState } from "react";
import googlelogo from "../../assest/images/landing-page/google.png";
import facebooklogo from "../../assest/images/landing-page/facebook.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BgImage from "./BgImage";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { registration } from "./authSlice";
import EventPopUpTermsAndConditionsPopUp from "./EventPopUpTermsAndConditionsPopUp";
import Modal from "./Modal";

const Register = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isTermsAndConditionPopUpOpen, setIsTermsAndConditionPopUpOpen] =
    useState(false);
  const initialState = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    country_code: "+91",
    refer_code: "",
    agentid: searchParams.get("agent_id") ? searchParams.get("agent_id") : null,
  };
  console.log(searchParams.get("agent_id"));
  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("Full name is required*"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email address is required*"),
    mobile: Yup.number()
      .typeError("Phone no must be in digit")
      .integer()
      .positive("Phone no must be positive")
      .required("Phone no is required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        `Make sure your password is of 8 characters, 5 alphabets, 2 number and 1 symbol.`
      )
      .required("Password is required*"),
    password2: Yup.string()
      .min(6, "Too Short!")
      .required("Password is required*"),
  });

  const clickSubmitHandler = async (values) => {
    // console.log(values);
    if (values.password !== values.password2) {
      toast.warn("confirm password and password is not matching");
      return;
    }
    if (!isCheck) {
     alert("PLEACE ACCEPT THE TERMS AND CONDITION");
      return;
    }
    try {
      let payload = Object.assign({}, values);
      const response = await dispatch(registration(payload)).unwrap();
      console.log(response);
      if (response.data?.IsSuccess) {
        toast.success(response.data.IsSuccess?.Message);
        if (searchParams.get("agent_id")) {
          navigate(
            `../verify/${values.mobile}/${true}/?agent_id=${searchParams.get(
              "agent_id"
            )}`
          );
        } else {
          navigate(`../verify/${values.mobile}/${true}`);
        }
      } else {
        toast.error(response.data?.IsSuccess.Message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.Message || "Something went wrong!!!");
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex w-full h-[100vh] flex-wrap bg-white">
        <BgImage />
        <div className="w-full h-full relative lg:w-1/2 flex px-4 overflow-y-auto py-5">
          <div className="max-w-md w-full m-auto">
            <h1>Create an Agent Account</h1>
            <p className="sm:text-lg xl:text-xl text-quicksilver font-normal sm:pt-3.5">
              Let’s get you all set up you can verify your personal account and
              login setting up your profile
            </p>
            <div className="w-full pt-7 sm:pt-10">
              <Formik
                initialValues={initialState}
                validationSchema={ValidationSchema}
                onSubmit={clickSubmitHandler}
              >
                {({ errors, touched, formik }) => (
                  <Form className="space-y-5">
                    <div>
                      <label htmlFor="" className="input-titel">
                        Your Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="input_box"
                        value={formik?.values.name}
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="input-titel">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="input_box"
                        value={formik?.values.email}
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="" className="input-titel">
                        Phone Number
                      </label>
                      <Field
                        type="text"
                        name="mobile"
                        className="input_box"
                        value={formik?.values.mobile}
                      />
                      {/* <span className="cursor-pointer text-[#E58F0D] text-sm font-semibold absolute right-4 top-10" >Verify</span> */}
                      {/* <span className="cursor-pointer text-caribbeanGreen text-sm font-semibold absolute right-4 bottom-4" >Verify</span> */}
                      <ErrorMessage
                        name="mobile"
                        component="span"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="flex justify-between flex-wrap space-y-5 sm:space-y-0">
                      <div className="relative w-full sm:w-[48%]">
                        <label htmlFor="" className="input-titel">
                          password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          className="input_box pr-10"
                          value={formik?.values.password}
                        />
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-red-500 text-xs whitespace-nowrap"
                        />
                        {/* <span className="icon-eye text-xl opacity-50 absolute right-3 bottom-3 cursor-pointer"></span> */}
                      </div>
                      <div className="relative w-full sm:w-[48%]">
                        <label htmlFor="" className="input-titel">
                          Confirm Password
                        </label>
                        <Field
                          type={isVisible ? "text" : "password"}
                          name="password2"
                          className="input_box pr-10"
                          value={formik?.values.password2}
                        />
                        <span
                          className={
                            isVisible
                              ? "icon-eye text-xl opacity-50 absolute right-3 top-10 cursor-pointer"
                              : "icon-pass-hide text-xl opacity-50 absolute right-3 top-10 cursor-pointer"
                          }
                          onClick={() => setIsVisible(!isVisible)}
                        ></span>
                        <ErrorMessage
                          name="password2"
                          component="span"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <label className="checkbox rounded bg-white">
                        <input
                          type="checkbox"
                          checked={isCheck ? true : false}
                          onClick={() => {
                            if (isCheck === true) {
                              setIsTermsAndConditionPopUpOpen(false)
                              setIsCheck(false)
                            }
                            else {
                              setIsTermsAndConditionPopUpOpen(true)
                            }
                          }
                          }
                        />
                        <i className="icon-right"></i>
                      </label>
                      <span className="input-titel text-base ml-4">By continuing, I agree to the <button>terms and conditions.</button>
                      </span>
                    </div>
                    {/* <button
                      className="btn-primary w-full"
                      // onClick={() => saveData()}
                    >
                      {intl.formatMessage({ id: "SAVE" })}
                    </button> */}
                    <button
                      type="submit"
                      className="btn-primary w-full py-[15px] uppercase"
                    >
                      Register Now
                    </button>
                    <span className="block text-sm text-japaneseIndigo font-bold text-center">
                      Have an account? <Link to="/">Login in</Link>
                    </span>
                  </Form>
                )}
              </Formik>
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
      <Modal isOpen={isTermsAndConditionPopUpOpen}>
          <EventPopUpTermsAndConditionsPopUp
            handleClose={setIsTermsAndConditionPopUpOpen}
           
            setIsCheck={setIsCheck}
          />
        </Modal>
    </div>
  );
};

export default Register;
