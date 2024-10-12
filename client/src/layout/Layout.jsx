import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import SnackbarComponent from "./SnackbarComponent";

const Layout = () => {
  const { pathname } = useLocation();

  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const handelSearch = (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      e.preventDefault();
      setSearch(value);
    }
  };

  useEffect(() => {
    setValue("");
  }, [pathname]);

  useEffect(() => {
    if (!value) setSearch("");
  }, [value]);

  return (
    <React.Fragment>
      <Navbar value={value} setValue={setValue} handelSearch={handelSearch} />
      <Outlet context={[search]} />
      <SnackbarComponent />
    </React.Fragment>
  );
};

export default Layout;
