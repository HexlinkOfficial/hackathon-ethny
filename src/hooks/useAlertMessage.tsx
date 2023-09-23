import { Alert, AlertProps, Snackbar, SnackbarOrigin } from "@mui/material";
import { useState } from "react";

interface State extends Partial<SnackbarOrigin> {
  open: boolean;
  messageBody: string;
  messageSeverity?: AlertProps["severity"];
}

export function useAlertMessage() {
  const [state, setState] = useState<State>({
    open: false,
    messageBody: "",
  });

  const {
    vertical = "top",
    horizontal = "center",
    messageSeverity = "success",
    open,
    messageBody,
  } = state;

  const handleClick = (newState: Omit<State, "open">) => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const message = (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical,
        horizontal,
      }}
    >
      <Alert
        onClose={handleClose}
        severity={messageSeverity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {messageBody}
      </Alert>
    </Snackbar>
  );

  return {
    message,
    showMessage: handleClick,
  };
}
