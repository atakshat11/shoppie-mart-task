import React from "react";
import { Field, Form, Formik } from "formik";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import baseUrl from '../helpers/baseUrl'
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const login = () => {

  const defaultValue = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    console.log(values);
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    const res = await fetch(`${baseUrl}/api/login`, option);
    const loginData = await res.json();
    console.log("loginData", loginData);

    const loginDataSaved = () => {
      console.log("User Registerd!");
      toast.success("User Login Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    };

    const loginDataErr = () => {
      console.log("Error!,User Not Logged Yet");
      toast.error("User not Logged Yet,Try Again!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    };

    if (loginData.error) {
      loginDataErr();
    } else {
      loginDataSaved();
      console.log("Login Data", loginData);
      cookie.set("token", loginData.token);
      cookie.set("user", JSON.stringify(loginData.user));
      console.log('user data',typeof(loginData.user))
      // router.push("/profile");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Formik initialValues={defaultValue} onSubmit={handleSubmit}>
              <Form>
                <div className="border border-danger border-3 my-3 p-4 bg-light">
                  <h1 className="fs-2 fs-bold text-dark text-center">
                    Login Form
                  </h1>
                  <hr />
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <Field
                      name="email"
                      id="email"
                      placeholder="Enter your Email..."
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label className="form-label">Password</label>
                    <Field
                      name="password"
                      id="password"
                      placeholder="Enter your Password"
                      type="password"
                      className="form-control"
                    />
                  </div>
                  <div className="text-center my-3">
                    <button
                      type="submit"
                      className="btn btn-success fs-5 fw-bold m-3"
                    >
                      Login
                    </button>
                  </div>
                  <hr />
                  <div className="row text-center text-primary">
                    <Link href="/signup">
                      <a>
                        <h5>
                          <u>Don't have You Account?</u>
                        </h5>
                      </a>
                    </Link>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>

          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
};
export default login;
