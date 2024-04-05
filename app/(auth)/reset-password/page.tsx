"use client";


import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Footer from "@/app/components/footer/Footer";
import Link from "next/link";
import Navbar from "@/app/components/navbar/Navbar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  // const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const queryToken = new URLSearchParams(window.location.search).get("token");
    setToken(queryToken);

    const verifyTokenValidity = async () => {
      if (queryToken) {
        setLoading(true);
        try {
          const response = await axios.post("/api/verify-token", {
            token: queryToken,
          });
          if (response.status === 200) {
            setSuccess(true);
            setMessage(response.data.message);
          } else {
            setMessage(response.data.message || "Invalid token");
          }
        } catch (error: any) {
          console.error(error.response.data.message);
          setMessage(error.response.data.message);
          setError(error.response.data.message);
        } finally {
          setLoading(false);
        }
      } else {
        setMessage("Invalid token");
        setLoading(false);
      }
    };

    verifyTokenValidity();
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="terminal-loader">
          <div className="terminal-header">
            <div className="terminal-title">Status</div>
            <div className="terminal-controls">
              <div className="control close"></div>
              <div className="control minimize"></div>
              <div className="control maximize"></div>
            </div>
          </div>
          <div className="text">Verifying...</div>
        </div>
      ) : (
        <div className="bg-[#F4F4F4] pt-[80px] md:pt-[100px] h-screen">
          <div className="relative  w-full lg:w-[60%] mx-auto bg-white rounded-sm border-2 border-gray-300 py-[30px] px-[10px] md:px-[30px]">
            <h3 className="border-b border-gray-300 font-bold text-[#434343] md:text-[20px] ">
              Reset Password
            </h3>
            <div className="pt-[20px] pb-[10px]">
              <div className={`${success ? "text-green-500" : "text-red-500"}`}>
                {success ? "" : <small>Error: {message}</small>}
              </div>
              <div>
                {success ? (
                  <small>
                    Please provide a new password for the account Adex2210.
                  </small>
                ) : (
                  <small>
                    Please request for a new link if the token has expired.{" "}
                  </small>
                )}
              </div>
            </div>
            {success && (
              <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={Yup.object().shape({
                  password: Yup.string()
                    .matches(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
                      "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, one special character, and one digit"
                    )
                    .required("Password is required"),
                  confirmPassword: Yup.string()
                    .required("Confirm Password is required")
                    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  try {
                    console.log(values);
                    const response = await axios.post("/api/reset-password", {
                      token,
                      password: values.password,
                    });

                    if (response.status === 200) {
                      setSuccess(true);
                    } else {
                      setError(
                        response.data.error || "Failed to reset password"
                      );
                    }
                  } catch (error) {
                    console.error("Error resetting password:", error);
                    setError("Internal server error");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="text-[13px] text-[#434343]">
                    <div className="relative w-full flex flex-col gap-[5px]">
                      <label
                        className="w-full font-bold text-[#434343]"
                        htmlFor="password"
                      >
                        Password:
                      </label>
                      <Field
                        type={showPassword ? "text" : "password"}
                        autoComplete="on"
                        name="password"
                        className={`w-full border border-2 px-3 py-[5px] border-gray-300 relative`}
                        placeholder={
                          touched.password && errors.password
                            ? errors.password
                            : "Enter your password"
                        }
                        required
                      />
                      <button
                        type="button"
                        className={`absolute right-[20px] top-[50%] ${errors.password ? 'transform -translate-y-1/2' : ''} bg-transparent border-none cursor-pointer`}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <AiFillEyeInvisible size={25} />
                        ) : (
                          <AiFillEye size={25} />
                        )}
                      </button>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 relative"
                      />
                    </div>
                    <div className="relative w-full flex flex-col gap-[5px] mt-[15px]">
                      <label
                        className="w-full font-bold text-[#434343]"
                        htmlFor="confirmPassword"
                      >
                        Repeat password:
                      </label>
                      <Field
                        type={showPassword ? "text" : "password"}
                        autoComplete="on"
                        name="confirmPassword"
                        className={`w-full border border-2 px-3 py-[5px] border-gray-300`}
                        placeholder={
                          touched.confirmPassword && errors.confirmPassword
                            ? errors.confirmPassword
                            : "Enter your confirmPassword"
                        }
                        required
                      />
                      <button
                        type="button"
                        className={`absolute right-[20px] top-[50%] ${errors.confirmPassword ? 'transform -translate-y-1/2' : ''} bg-transparent border-none cursor-pointer`}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <AiFillEyeInvisible size={25} />
                        ) : (
                          <AiFillEye size={25} />
                        )}
                      </button>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 relative"
                      />
                    </div>
                    <div className="py-[25px] flex gap-4">
                      <button
                        type="submit"
                        className="bg-[#FF2E51] px-3 py-[6px] text-white rounded-sm"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div>Connecting...</div>
                        ) : (
                          <div>Submit</div>
                        )}
                      </button>
                      <div className="flex my-auto text-[12px] md:text-[14px]">
                        <span>or </span>
                        <Link href="/login" className="ml-[5px] underline">
                          Login
                        </Link>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ResetPassword;
