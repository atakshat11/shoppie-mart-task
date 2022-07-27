import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import Link from "next/link";
import baseUrl from '../helpers/baseUrl'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
 

  //default Values
  const defaultValue = {
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };
  // console.log(defaultValue)

  const validatonSchema = yup.object().shape({
    //FirstName Validation
    firstName: yup
      .string()
      .required("FirstName Required Field *** ")
      .matches(
        /^[aA-zZ\s]+$/,
        "Only alphabets are allowed for First Name *** "
      ),

    //LastName Validation
    lastName: yup
      .string()
      .required("LastName Required Field *** ")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Last Name *** "),

    //Gender Validation
    gender: yup.string().required("Select any Gender....***"),

    //Birth Date Validation
    birthDate: yup.string().required("Birthdate is a required Field...***"),

    //Email Validation
    email: yup
      .string()
      .email("Invalid email format")
      .required("Enter your Email Address...***"),
    //Phone Number Validation
    phoneNumber: yup
      .string()
      .required("Phone Number is Required...***")
      .matches(/^[6-9]\d{9}$/, {
        message: "Please enter valid number.",
        excludeEmptyString: false,
      }),

    //Password Validation
    password: yup
      .string()
      .required("Enter your Password...***")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=(.*[@$!%*#?&])(.*[@$!%*#?&]))[A-Za-z\d@$!%*#?&]{10,}$/,
        "Must Contain 10 Characters, ONE Uppercase, ONE Lowercase, ONE Number and TWO special case Character"
      ),

    //Confirm Password Validation
    confirmPassword: yup
      .string()
      .required("Confirm Password Must Required...***")
      .oneOf([yup.ref("password"), null], "Password does not Match!!!!"),
  });

  const signupDataSaved = () => {
    console.log("User Registerd!");
    toast.success("User Signup Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const signupDataErr = () => {
    console.log("Error!,User Not Registerd Yet");
    toast.error("User not Registered Yet,Try Again!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //It shows Error Message in Form...
  const ErrMsg = ({ name }) => {
    return (
      <div style={{ color: "red", fontWeight: "200" }}>
        <br />
        <ErrorMessage name={name} />
      </div>
    );
  };

  const handleSubmit = async (values) => {
    console.log("values", values);
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
      const res = await fetch(`${baseUrl}/api/signup`, option);
      const signupData = await res.json();

      if (signupData.error) {
        signupDataErr();
      } else {
        signupDataSaved();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-4 p-5">
          <img
            className="w-100"
            src="https://uploads-ssl.webflow.com/6050fd049eb2523a02891b51/616002c5842b1986d6649b93_Top-Question-About-Trademarks-in-Canada.jpeg"
          />
        </div>
        <div className="col-md-8  p-4 bg-light fs-5 fw-bold">
          <Formik
            initialValues={defaultValue}
            validationSchema={validatonSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="row">
                {/* First Name Field */}
                <div className="form-group col-md-6">
                  <label className="form-label"> First Name</label>
                  <Field
                    name="firstName"
                    id="firstName"
                    placeholder="Enter your First Name..."
                    type="text"
                    className="form-control"
                  />
                  <ErrMsg name="firstName" />
                </div>
                {/* Last Name Field */}
                <div className="form-group col-md-6">
                  <label className="form-label">Last Name</label>
                  <Field
                    name="lastName"
                    id="lastName"
                    placeholder="Enter your Last Name..."
                    type="text"
                    className="form-control"
                  />
                  <ErrMsg name="lastName" />
                </div>
              </div>

              <div className="row">
                {/*Gender Field */}
                <div className="col-md-6">
                  <label className="form-label">Gender</label>
                  <div className="form-control form-check form-check-inline">
                    <div className="form-check form-check-inline">
                      <Field
                        name="gender"
                        id="gender-male"
                        placeholder="select gender"
                        type="radio"
                        value="male"
                      />
                      Male
                    </div>
                    <div className="form-check form-check-inline">
                      <Field
                        name="gender"
                        id="gender-female"
                        placeholder="select gender"
                        type="radio"
                        value="female"
                      />{" "}
                      Female
                    </div>
                    <div className="form-check form-check-inline">
                      <Field
                        name="gender"
                        id="gender-other"
                        placeholder="select gender"
                        type="radio"
                        value="other"
                      />{" "}
                      Other
                    </div>
                  </div>
                  <ErrMsg name="gender" />
                </div>
                {/* Birth Date Field */}
                <div className="col-md-6 form-group">
                  <label className="form-label">Birth Date</label>
                  <Field
                    name="birthDate"
                    id="birthDate"
                    placeholder="Enter Birthdate..."
                    type="date"
                    className="form-control"
                  />
                  <ErrMsg name="birthDate" />
                </div>
              </div>

              <div className="row">
                {/* Email Field */}
                <div className="form-group col-md-6">
                  <label className="form-label">Email</label>
                  <Field
                    name="email"
                    id="email"
                    placeholder="Enter your Email..."
                    type="email"
                    className="form-control"
                  />
                  <ErrMsg name="email" />
                </div>
                {/* Phone-Number Field */}
                <div className="col-md-6 form-group">
                  <label className="form-label">Phone Number</label>
                  <Field
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter your Mobile Number..."
                    type="text"
                    className="form-control"
                  />
                  <ErrMsg name="phoneNumber" />
                </div>
              </div>

              <div className="row">
                {/* Password Field */}
                <div className="form-group col-md-6">
                  <label className="form-label">Password</label>
                  <Field
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                    type="password"
                    className="form-control"
                  />
                  <ErrMsg name="password" />
                </div>
                {/* Confirm Password Field */}
                <div className="form-group col-md-6">
                  <label className="form-label">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Enter your Password Again..."
                    type="password"
                    className="form-control"
                  />
                  <ErrMsg name="confirmPassword" />
                </div>
              </div>

              <div className="row ">
                <div className="col-md-5"></div>
                <div className="col-md-2">
                  <button
                    type="submit"
                    className="btn btn-success text-white fs-5"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="col-md-5"></div>
              </div>
              <hr />
              <div className="row text-center text-primary">
                <Link href="/login">
                  <a>
                    <h5>
                      <u>Already have a Account ?</u>
                    </h5>
                  </a>
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
