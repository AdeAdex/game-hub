// "use client";

// import React, { useContext } from 'react';
// import { Modal, Box, Typography, Button, TextField } from '@mui/material';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { useSnackbar } from 'notistack';
// import { supportValidationSchema } from '@/app/components/validations/supportValidationSchema';
// import { ThemeContext } from '@/app/lib/ThemeContext';

// interface SupportTicketModalProps {
//   isOpen: boolean; 
//   onClose: () => void; 
// }

// const SupportTicketModal: React.FC<SupportTicketModalProps> = ({ isOpen, onClose }) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const { theme } = useContext(ThemeContext);

//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       description: '',
//     },
//     validationSchema: supportValidationSchema,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//       setSubmitting(true);
//       try {
//         const response = await axios.post('/api/conversation/support/tickets', values);
//         enqueueSnackbar(response.data.message || 'Message sent successfully!', {
//           variant: 'success',
//         });
//         resetForm();
//         onClose(); // Close the modal on successful submission
//       } catch (error) {
//         enqueueSnackbar('Failed to send message. Please try again.', {
//           variant: 'error',
//         });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <Modal
//       open={isOpen}
//       onClose={onClose}
//       aria-labelledby="support-ticket-modal-title"
//       aria-describedby="support-ticket-modal-description"
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
//           color: theme === 'dark' ? 'white' : 'text.primary',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 2,
//         }}
//       >
//         <Typography id="support-ticket-modal-title" variant="h6" component="h2" gutterBottom>
//           Submit a Support Ticket
//         </Typography>
//         <form onSubmit={formik.handleSubmit}>
//           <TextField
//             id="title"
//             name="title"
//             label="Title"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.title}
//             error={formik.touched.title && Boolean(formik.errors.title)}
//             helperText={formik.touched.title && formik.errors.title}
//             InputProps={{
//               style: {
//                 backgroundColor: theme === 'dark' ? '#424242' : 'white',
//                 color: theme === 'dark' ? 'white' : 'black',
//               },
//             }}
//             InputLabelProps={{
//               style: {
//                 color: theme === 'dark' ? 'white' : 'black',
//               },
//             }}
//           />
//           <TextField
//             id="description"
//             name="description"
//             label="Description"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.description}
//             error={formik.touched.description && Boolean(formik.errors.description)}
//             helperText={formik.touched.description && formik.errors.description}
//             InputProps={{
//               style: {
//                 backgroundColor: theme === 'dark' ? '#424242' : 'white',
//                 color: theme === 'dark' ? 'white' : 'black',
//               },
//             }}
//             InputLabelProps={{
//               style: {
//                 color: theme === 'dark' ? 'white' : 'black',
//               },
//             }}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//             <Button
//               onClick={onClose}
//               variant="contained"
//               color="secondary"
//               sx={{ mr: 2 }}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               disabled={formik.isSubmitting}
//             >
//               {formik.isSubmitting ? 'Submitting...' : 'Submit'}
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default SupportTicketModal;





"use client";

import React, { useContext } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { supportValidationSchema } from '@/app/components/validations/supportValidationSchema';
import { ThemeContext } from '@/app/lib/ThemeContext';

interface SupportTicketModalProps {
  isOpen: boolean; 
  onClose: () => void; 
}

const SupportTicketModal: React.FC<SupportTicketModalProps> = ({ isOpen, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { theme } = useContext(ThemeContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: supportValidationSchema,
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
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title ? formik.errors.title : ''}
            placeholder={formik.touched.title && formik.errors.title ? formik.errors.title : 'Enter your title'}
            InputProps={{
              style: {
                backgroundColor: theme === 'dark' ? '#424242' : 'white',
                color: theme === 'dark' ? 'white' : 'black',
              },
            }}
            InputLabelProps={{
              style: {
                color: theme === 'dark' ? 'white' : 'black',
              },
            }}
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description ? formik.errors.description : ''}
            placeholder={formik.touched.description && formik.errors.description ? formik.errors.description : 'Enter your description'}
            InputProps={{
              style: {
                backgroundColor: theme === 'dark' ? '#424242' : 'white',
                color: theme === 'dark' ? 'white' : 'black',
              },
            }}
            InputLabelProps={{
              style: {
                color: theme === 'dark' ? 'white' : 'black',
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
};

export default SupportTicketModal;
