import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ messages, type = "info" }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState([]);

  React.useEffect(() => {
    if (messages && messages.length > 0) {
      setMessage(messages);
      setOpen(true);
    } else {
      if (message.length != 0) {
        setMessage([]);
      }
    }
  }, [messages]);

  const handleClick = () => {};

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        <ul>
          {message.map((message, index) => (
            <li key={index}>{message.msg}</li>
          ))}
        </ul>
      </Alert>
    </Snackbar>
  );
}
