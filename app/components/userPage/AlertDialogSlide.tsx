// /app/components/userPage/AlertDialogSlide.tsx

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  openDialog: boolean;
  loading: boolean;
  handleCloseDialog: () => void;
  selectedPost: string;
  handleAction: (action: string, postId: string) => void; // Add handleAction prop
}

export default function AlertDialogSlide({ openDialog, loading, handleCloseDialog, selectedPost, handleAction }: AlertDialogSlideProps) {
  const handleDelete = async () => {
    // Call the handleAction function
    await handleAction('delete', selectedPost);
    // Close the dialog after the action is completed
    handleCloseDialog();
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleDelete} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Agree'}
          </Button> 
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
    }
