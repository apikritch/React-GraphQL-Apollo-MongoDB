import React from "react";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColorButton = (props) => {
  const {
    background,
    hoverBackground,
    icon,
    text,
    type,
    handleClick,
    hideText,
    customPadding,
    className,
    inverse,
  } = props;

  const StyledButton = styled(Button)(() => ({
    color: inverse ? background : "#ffffff",
    backgroundColor: inverse ? "#ffffff" : background,
    "&:hover": {
      backgroundColor: inverse ? "#ffffff" : hoverBackground,
    },
    textTransform: "unset",
    fontFamily: "inherit",
    fontSize: "100%",
    fontWeight: "inherit",
    border: inverse ? `1px solid ${background}` : "",
    borderRadius: "0.5rem",
    padding: `${customPadding ? customPadding : ""}`,
  }));

  return (
    <StyledButton
      variant="contained"
      className={`${
        !customPadding &&
        "!py-[0.5rem] !px-[0.55rem] sm:!py-[0.4rem] sm:!px-[1.25rem] !min-w-fit"
      } ${className}`}
      type={type}
      onClick={handleClick}
    >
      {icon && <FontAwesomeIcon className="sm:mr-2" icon={icon} />}
      <div className={`${hideText && "hidden sm:block"}`}>{text}</div>
    </StyledButton>
  );
};

export default ColorButton;
