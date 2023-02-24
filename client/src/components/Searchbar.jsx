import React from "react";

import { Paper, InputBase, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Searchbar = (props) => {
  const { value, setValue, handelSearch } = props;

  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      variant="outlined"
      className="h-9 md:h-[45px] w-[60vw] md:w-[40vw]"
      onSubmit={handelSearch}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        inputProps={{ "aria-label": "search google maps" }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={handelSearch}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handelSearch}
      >
        <FontAwesomeIcon
          icon={solid("magnifying-glass")}
          className="text-[1rem] 2xl:text-[1.25rem]"
        />
      </IconButton>
    </Paper>
  );
};

export default Searchbar;
