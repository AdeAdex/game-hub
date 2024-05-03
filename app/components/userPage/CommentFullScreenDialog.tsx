import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IoClose } from "react-icons/io5";
import { IoIosCamera } from "react-icons/io";
import { LuSend } from "react-icons/lu";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio: string;
  currentFriends?: string[];
}

interface CommentFullScreenDialogProps {
  setOpenCommentDialog: React.Dispatch<boolean>;
  openCommentDialog: boolean;
  user: User;
} 

export default function CommentFullScreenDialog({ openCommentDialog, setOpenCommentDialog, user}:CommentFullScreenDialogProps ) {

  const handleClose = () => {
    setOpenCommentDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={openCommentDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
<IoClose /> 
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <div className="fixed bottom-0 left-0 py-1 flex flex-col w-full relative ">
            <Divider />
          <input
          type="text"
          placeholder={`Comments as ${user.lastName} ${user.firstName}`}
          className="mx-auto text-[12px] hover:bg-gray-200 bg-gray-100 cursor-pointer rounded-lg py-2 px-3 w-[90%] focus:outline-none focus:border-none"
        /> 
            <div className="mx-auto flex justify-between py-2 w-[90%] " >
              <IoIosCamera />
              <LuSend />
            </div>
          </div>
        </List>
      </Dialog>
    </React.Fragment>
  );
}

