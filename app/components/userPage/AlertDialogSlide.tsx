// /app/components/userPage/AlertDialogSlide.tsx

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  openDialog: boolean;
  loading: boolean;
  handleCloseDialog: () => void;
  selectedPostId: string;
  handleAction: (action: string, postId: string) => void; // Add handleAction prop
}

export default function AlertDialogSlide({
  openDialog,
  loading,
  handleCloseDialog,
  selectedPostId,
  handleAction,
}: AlertDialogSlideProps) {
  const handleDelete = async () => {
    // Call the handleAction function
    await handleAction("delete", selectedPostId);
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
        PaperProps={{
          className: "dark:bg-gray-800 dark:text-whit bg-white text-black", // Apply theme classes
        }}
      >
        <DialogTitle
          className={"dark:bg-gray-800 dark:text-white bg-white text-black"}
        >
          {"Delete Post?"}
        </DialogTitle>
        <DialogContent
          className={"dark:bg-gray-800 dark:text-whit bg-white text-black"}
        >
          <DialogContentText id="alert-dialog-slide-description">
            <span className={"dark:text-white text-black"}>
              Are you sure you want to delete this post?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          className={"dark:bg-gray-800 dark:text-whit bg-white text-black"}
        >
          <Button onClick={handleCloseDialog}>
            <span className={"dark:text-white"}>Disagree</span>
          </Button>
          <Button onClick={handleDelete} disabled={loading}>
            <span className={"dark:text-white"}>
              {loading ? <CircularProgress size={24} /> : "Agree"}
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
