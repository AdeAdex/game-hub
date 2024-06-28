"use client";

import { useState, useEffect, useContext } from "react";
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
import { ThemeContext } from "@/app/lib/ThemeContext";



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
  const { theme } = useContext(ThemeContext);


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
  <div className={`h-screen ${theme === "dark" ? "dark-mode-content text-white" : "bg-[#F4F4F4] text-[#434343]"}`}>
    <Navbar onSearch={(query) => {}} suggestions={[]}/>
    <main className={`h-screen pt-[80px] md:pt-[100px] ${theme === "dark" ? "bg-gray-800" : "bg-[#F4F4F4]"}`}>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px]">
          <div className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}>
            <h3 className={`border-b font-bold md:text-[20px] ${theme === "dark" ? "border-gray-600 text-white" : "border-gray-300 text-[#434343]"}`}>
              Reset Password
            </h3>
            <div className="pt-[20px] pb-[10px]">
              <div className={`${success ? "text-green-500" : "text-red-500"}`}>
                {success ? "" : <small>Error: {message}</small>}
              </div>
              <div>
                {success ? (
                  <small>
                    Please provide a new password for the account {username}.
                  </small>
                ) : (
                  <small>
                    Please request for a new link if the token has expired.
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
                    const response = await axios.post("/api/reset-password", {
                      token,
                      password: values.password,
                      device,
                      location,
                    });
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
                  <Form className="text-[13px]">
                    <div className="relative w-full flex flex-col gap-[5px]">
                      <label className={`w-full font-bold ${theme === "dark" ? "text-white" : "text-[#434343]"}`} htmlFor="password">
                        Password:
                      </label>
                      <Field
                        type={showPassword ? "text" : "password"}
                        autoComplete="on"
                        name="password"
                        className={`w-full border border-2 px-3 py-[5px] ${theme === "dark" ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"}`}
                        placeholder={
                          touched.password && errors.password
                            ? errors.password
                            : "Enter your password"
                        }
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-[20px] top-[50%] transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
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
                        className="text-red-500"
                      />
                    </div>
                    <div className="relative w-full flex flex-col gap-[5px] mt-[15px]">
                      <label className={`w-full font-bold ${theme === "dark" ? "text-white" : "text-[#434343]"}`} htmlFor="confirmPassword">
                        Repeat password:
                      </label>
                      <Field
                        type={showPassword ? "text" : "password"}
                        autoComplete="on"
                        name="confirmPassword"
                        className={`w-full border border-2 px-3 py-[5px] ${theme === "dark" ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"}`}
                        placeholder={
                          touched.confirmPassword && errors.confirmPassword
                            ? errors.confirmPassword
                            : "Enter your confirm password"
                        }
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-[20px] top-[50%] transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
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
                        className="text-red-500"
                      />
                    </div>
                    <div className="py-[25px] flex gap-4">
                      <button
                        type="submit"
                        className={`px-3 py-[6px] rounded-sm text-white ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""} ${theme === "dark" ? "bg-red-600" : "bg-[#FF2E51]"}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <div>Connecting...</div> : <div>Submit</div>}
                      </button>
                      <div className={`flex my-auto text-[12px] md:text-[14px] ${theme === "dark" ? "text-white" : "text-[#434343]"}`}>
                        <span>or </span>
                        <Link href="/login" className={`ml-[5px] underline ${theme === "dark" ? "text-red-400" : "text-[#FF2E51]"}`}>
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
