import React from "react";

import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "0.5rem",
};

const ModalBox = (props) => {
  const { onSubmit } = props;
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={style}
      className="!px-6 !py-6 sm:!p-8 w-[85vw] sm:w-[475px] md:w-[500px] max-h-[75vh] overflow-auto"
    >
      {props.children}
    </Box>
  );
};

export default ModalBox;
