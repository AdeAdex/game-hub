"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Footer from "@/app/components/footer/Footer";
import Link from "next/link";
import Navbar from "@/app/components/navbar/Navbar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SnackbarProvider, useSnackbar } from "notistack";
import Loader from "@/app/components/Loader";
import { useFetchLocation, useDetectDevice } from "@/app/utils/useDeviceUtils"; // Adjust the import path accordingly


const ResetPassword = () => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp />
    </SnackbarProvider>
  );
};

function MyApp() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { location, locationError, fetchLocation} = useFetchLocation();
  const device = useDetectDevice();

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

          // console.log(response.data.username)
          if (response.status === 200) {
            setUsername(response.data.username);
            setSuccess(true);
            setMessage(response.data.message);
            enqueueSnackbar(
              response.data.message || "Password reset request successful!",
              {
                variant: "success",
              }
            );
          } else {
            setMessage(response.data.message || "Invalid token");
            enqueueSnackbar(response.data.message || "Invalid token", {
              variant: "error",
            });
          }
        } catch (error: any) {
          console.error(error.response.data.message);
          setMessage(error.response.data.message);
          setError(error.response.data.message);
          enqueueSnackbar(error.response.data.message, {
            variant: "error",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setMessage("Invalid token");
        setLoading(false);
      }
    };

    verifyTokenValidity();
  }, [enqueueSnackbar]);

  useEffect(() => {
    // Ask for location permission when the component mounts
    fetchLocation();
  }, [fetchLocation]);


  return (
    <div>
      <Navbar />
      <main className="bg-[#F4F4F4] h-screen  pt-[80px] md:pt-[100px] ">
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <div className="relative  w-full lg:w-[60%] mx-auto bg-white rounded-sm border-2 border-gray-300 py-[30px] px-[10px] md:px-[30px]">
              <h3 className="border-b border-gray-300 font-bold text-[#434343] md:text-[20px] ">
                Reset Password
              </h3>
              <div className="pt-[20px] pb-[10px]">
                <div
                  className={`${success ? "text-green-500" : "text-red-500"}`}
                >
                  {success ? "" : <small>Error: {message}</small>}
                </div>
                <div>
                  {success ? (
                    <small>
                      Please provide a new password for the account {username}.
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
                      console.log(device);
                      console.log(location);
                      const response = await axios.post("/api/reset-password", {
                        token,
                        password: values.password,
                        device,
                        location,
                      });
                      console.log(response.data);

                      if (response.status === 200) {
                        setSuccess(true);
                        enqueueSnackbar(response.data.message, {
                          variant: "success",
                        });
                        router.push("/login");
                      } else {
                        setError(
                          response.data.error || "Failed to reset password"
                        );
                        enqueueSnackbar(response.data.error, {
                          variant: "error",
                        });
                      }
                    } catch (error: any) {
                      console.error(error.response.data.error);
                      setError(
                        error.response.data.error || "Internal server error"
                      );
                      enqueueSnackbar(
                        error.response.data.error || "Internal server error",
                        {
                          variant: "error",
                        }
                      );
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
                          className={`absolute right-[20px] top-[50%] ${
                            errors.password ? "transform -translate-y-1/2" : ""
                          } bg-transparent border-none cursor-pointer`}
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
                          className={`absolute right-[20px] top-[50%] ${
                            errors.confirmPassword
                              ? "transform -translate-y-1/2"
                              : ""
                          } bg-transparent border-none cursor-pointer`}
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
      </main>
    </div>
  );
}

export default ResetPassword;
