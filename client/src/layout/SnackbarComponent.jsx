import React, { forwardRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Snackbar, Alert } from "@mui/material";

import { snackbarAction } from "../store/features/snackbarSlice";

const SnackbarComponent = () => {
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = useState();

  const { snackbardata } = useSelector((state) => state.snackbar);

  const handleClose = (id) => {
    dispatch(snackbarAction.close(id));
  };

  const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    setSnackbar(snackbardata);
  }, [snackbardata]);

  return (
    <React.Fragment>
      {snackbar &&
        snackbar.length > 0 &&
        snackbar.map((item, index) => (
          <Snackbar
            key={item.id}
            style={{
              marginBottom: `${3.5 * (snackbar.length - index - 1)}rem`,
              order: index,
            }}
            open={item.open}
            autoHideDuration={5000}
            onClose={(event, reason) => {
              if (reason === "clickaway") {
                return;
              }
              if (item.hide) handleClose(item.id);
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <SnackbarAlert
              onClose={() => handleClose(item.id)}
              severity={item.severity}
            >
              {item.message}
            </SnackbarAlert>
          </Snackbar>
        ))}
    </React.Fragment>
  );
};

export default SnackbarComponent;
