"use client";

import React, { useContext } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { SnackbarProvider, useSnackbar } from "notistack";
import { ThemeContext } from '@/app/lib/ThemeContext';
import { supportTicketValidationSchema } from '../validations/supportTicketValidationSchema';

interface SupportTicketModalProps {
  isOpen: boolean; 
  onClose: () => void; 
}

const SupportTicketModal: React.FC<SupportTicketModalProps> = ({ isOpen, onClose }) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp isOpen={isOpen} onClose={onClose}/>
    </SnackbarProvider>
  );
};

function MyApp({ isOpen, onClose }: SupportTicketModalProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { theme } = useContext(ThemeContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: supportTicketValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const response = await axios.post('/api/conversation/support/tickets', values);
        enqueueSnackbar(response.data.message || 'Message sent successfully!', {
          variant: 'success',
        });
        resetForm();
        onClose(); // Close the modal on successful submission
      } catch (error) {
        enqueueSnackbar('Failed to send message. Please try again.', {
          variant: 'error',
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
          color: theme === 'dark' ? 'white' : 'text.primary',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="support-ticket-modal-title" variant="h6" component="h2" gutterBottom>
          Submit a Support Ticket
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="title"
            name="title"
            label={formik.touched.title && formik.errors.title ? formik.errors.title : 'Title'}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            placeholder={formik.touched.title && formik.errors.title ? formik.errors.title : 'Enter your title'}
            className={`placeholder-${formik.touched.title && formik.errors.title ? 'red-500' : theme === 'dark' ? 'white' : 'black'}`}
            InputProps={{
              style: {
                backgroundColor: theme === 'dark' ? '#424242' : 'white',
                color: theme === 'dark' ? 'white' : 'black',
              },
            }}
            InputLabelProps={{
              style: {
                color: formik.touched.title && formik.errors.title ? 'red' : theme === 'dark' ? 'white' : 'black',
              },
            }}
          />
          <TextField
            id="description"
            name="description"
            label={formik.touched.description && formik.errors.description ? formik.errors.description : 'Description'}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder={formik.touched.description && formik.errors.description ? formik.errors.description : 'Enter your description'}
            className={`placeholder-${formik.touched.description && formik.errors.description ? 'red-500' : theme === 'dark' ? 'white' : 'black'}`}
            InputProps={{
              style: {
                backgroundColor: theme === 'dark' ? '#424242' : 'white',
                color: theme === 'dark' ? 'white' : 'black',
              },
            }}
            InputLabelProps={{
              style: {
                color: formik.touched.description && formik.errors.description ? 'red' : theme === 'dark' ? 'white' : 'black',
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              onClick={onClose}
              variant="contained"
              color="secondary"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default SupportTicketModal;
