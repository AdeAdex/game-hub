
"use client";

import React, { useState, useContext } from "react";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeContext } from "@/app/lib/ThemeContext";
import { useFormik } from "formik";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import { supportValidationSchema } from "@/app/components/validations/supportValidationSchema";
import SupportTicketModal from "@/app/components/support/SupportTicketModal";
import { faqs } from "../lib/FaqsData";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { MdExpandMore } from "react-icons/md";


const SupportPage: React.FC = () => {
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
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: supportValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const response = await axios.post("/api/conversation/support", values);
        enqueueSnackbar(response.data.message || "Message sent successfully!", {
          variant: "success",
        });
        resetForm();
      } catch (error) {
        enqueueSnackbar("Failed to send message. Please try again.", {
          variant: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className={`min-h-screen py-24 ${
        theme === "dark" ? "dark-mode-content text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar onSearch={(query) => {}} suggestions={[]} />
      <div
        className={`relative w-full lg:w-3/5 mx-auto rounded-lg shadow-lg border py-8 px-4 md:px-8 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <h3
          className={`border-b text-2xl pb-4 font-bold ${
            theme === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-gray-700"
          }`}
        >
          Support
        </h3>
        <div className="mt-8 space-y-12">
        <section className="support-section">
            <h4 className="text-xl font-semibold">Frequently Asked Questions</h4>
            <div className="mt-4 space-y-4">
              {faqs.map((faq, index) => (
                <Accordion key={index} style={{ backgroundColor: theme === 'dark' ? '#757575' : 'white', color: theme === 'dark' ? 'whiteSmoke' : 'black' }}>
                  <AccordionSummary expandIcon={<MdExpandMore style={{ color: theme === 'dark' ? 'white' : 'black', fontSize: '1.5rem' }} />}>
                    <Typography className="text-lg font-medium">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="text-sm">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </section>


          <section className="support-section">
            <h4 className="text-xl font-semibold">Contact Us</h4>
            <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="name" className="w-full font-bold text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={`w-full border border-2 px-3 py-[5px] rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  } ${
                    formik.errors.name && formik.touched.name
                      ? "register-input"
                      : ""
                  }`}
                  placeholder={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : "Enter your name"
                  }
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="email" className="w-full font-bold text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`w-full border border-2 px-3 py-[5px] rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  } ${
                    formik.errors.email && formik.touched.email
                      ? "register-input"
                      : ""
                  }`}
                  placeholder={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : "Enter your email"
                  }
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="message" className="w-full font-bold text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  className={`w-full border border-2 px-3 py-[5px] rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  } ${
                    formik.errors.message && formik.touched.message
                      ? "register-input"
                      : ""
                  }`}
                  rows={5}
                  placeholder={
                    formik.touched.message && formik.errors.message
                      ? formik.errors.message
                      : "Enter your message"
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`px-4 py-2 rounded-md ${
                  theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                }`}
              >
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </section>

          <section className="support-section">
            <h4 className="text-xl font-semibold">Support Tickets</h4>
            <div className="mt-4">
              <p className="text-sm">
                If you have a specific issue that needs further assistance, please submit a support ticket.
                Our support team will get back to you as soon as possible.
              </p>
              <button
                className={`mt-4 w-full md:w-auto py-2 px-6 rounded-md font-semibold ${
                  theme === "dark" ? "bg-green-600 text-white" : "bg-green-500 text-white"
                } transition-transform transform hover:scale-105`}
                onClick={toggleModal}
              >
                Submit a Ticket
              </button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
      <SupportTicketModal isOpen={isModalOpen} onClose={toggleModal} />      
    </div>
  );
}

export default SupportPage;
