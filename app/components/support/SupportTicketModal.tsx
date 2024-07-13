"use client";

import React, { useContext } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import { supportTicketValidationSchema } from "../validations/supportTicketValidationSchema";

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportTicketModal: React.FC<SupportTicketModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp isOpen={isOpen} onClose={onClose} />
    </SnackbarProvider>
  );
};

function MyApp({ isOpen, onClose }: SupportTicketModalProps) {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: supportTicketValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const response = await axios.post(
          "/api/conversation/support/tickets",
          values
        );
        enqueueSnackbar(response.data.message || "Message sent successfully!", {
          variant: "success",
        });
        resetForm();
        onClose(); // Close the modal on successful submission
      } catch (error) {
        enqueueSnackbar("Failed to send message. Please try again.", {
          variant: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="support-ticket-modal-title"
      aria-describedby="support-ticket-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
        className="bg-white dark:bg-gray-800 text-black dark:text-white"
      >
        <Typography
          id="support-ticket-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Submit a Support Ticket
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="title"
            name="title"
            label={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : "Title"
            }
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            placeholder={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : "Enter your title"
            }
            className={`placeholder-${
              formik.touched.title && formik.errors.title
                ? "register-input"
                : "text-black dark:text-white"
            }`}
            InputProps={{
              className: "bg-white dark:bg-gray-700 text-black dark:text-white",
            }}
            InputLabelProps={{
              className:
                formik.touched.title && formik.errors.title
                  ? "text-red-500"
                  : "text-black dark:text-white",
            }}
          />
          <TextField
            id="description"
            name="description"
            label={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : "Description"
            }
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : "Enter your description"
            }
            className={`placeholder-${
              formik.touched.description && formik.errors.description
                ? "register-input"
                : "text-black dark:text-white"
            }`}
            InputProps={{
              className: "bg-white dark:bg-gray-700 text-black dark:text-white",
            }}
            InputLabelProps={{
              className:
                formik.touched.description && formik.errors.description
                  ? "text-red-500"
                  : "text-black dark:text-white",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <button
              onClick={onClose}
              type="button"
              className="bg-pink-500 text-white border-none px-4 py-2 rounded cursor-pointer mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-indigo-500 text-white border-none px-4 py-2 rounded cursor-pointer"
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default SupportTicketModal;
