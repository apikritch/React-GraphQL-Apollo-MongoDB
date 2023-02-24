import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";

import {
  Paper,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Modal,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import Searchbar from "../components/Searchbar";
import ColorButton from "../components/ColorButton";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";
import { authAction } from "../store/features/authSlice";
import { snackbarAction } from "../store/features/snackbarSlice";

const menu = ["Register", "Login"];
const loginmenu = ["Logout"];

const Navbar = (props) => {
  const { value, setValue, handelSearch } = props;

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const client = useApolloClient();

  const user = useSelector((state) => state.auth.user);

  const [openMenu, setOpenMenu] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpen = (type) => {
    if (type === "register") setOpenRegister(true);
    if (type === "login") setOpenLogin(true);
  };

  const handleClose = () => {
    setOpenRegister(false);
    setOpenLogin(false);
  };

  const handleModalOpen = (type) => {
    handleOpen(type);
    handleCloseUserMenu();
  };

  const toggleDrawer = (open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setOpenMenu(open);
  };

  const handleClick = (text) => {
    navigate(`/${text.toLowerCase()}`);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    dispatch(authAction.logout());
    client.resetStore();
    handleCloseUserMenu();
    dispatch(
      snackbarAction.open({
        message: "Logout successful!",
        severity: "success",
      })
    );
  };

  return (
    <div className="flex justify-between items-center mb-4 md:mb-8">
      <div className="md:hidden">
        <FontAwesomeIcon
          className={` text-[2.25em] ${
            pathname.includes("/products")
              ? "text-orange-500"
              : pathname === "/categories"
              ? "text-sky-500"
              : pathname.includes("/product/")
              ? "text-green-500"
              : ""
          }`}
          icon={solid("bars")}
          onClick={toggleDrawer(true)}
        />
        <Drawer anchor="left" open={openMenu} onClose={toggleDrawer(false)}>
          <Box
            // sx={{ width: "65vw" }}
            className="w-[62.5vw] sm:w-[32.5vw]"
            role="presentation"
            onClick={toggleDrawer(false)}
          >
            <List>
              {["Products", "Categories"].map((text, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  onClick={() => handleClick(text)}
                >
                  <ListItemButton>
                    <ListItemIcon className="!min-w-[56px]">
                      <FontAwesomeIcon
                        icon={
                          index === 0
                            ? solid("box")
                            : index === 1 && solid("border-all")
                        }
                        className="text-[1.5em]"
                      />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </div>
      <Paper variant="outlined" square className="hidden md:flex">
        <Link
          to="/products"
          className="products-button-container flex justify-center items-center"
        >
          <div
            className={`${
              pathname.includes("/products")
                ? ""
                : pathname === "/categories" && "products-button-background "
            }products-button`}
          ></div>
          <h3
            className={`${
              pathname.includes("/products")
                ? "products-text "
                : pathname === "/categories" && ""
            } products-button-text`}
          >
            Products
          </h3>
        </Link>
        <Link
          to="/categories"
          className="categories-button-container flex justify-center items-center"
        >
          <div
            className={`${
              pathname === "/categories"
                ? ""
                : pathname.includes("/products") &&
                  "categories-button-background "
            }categories-button`}
          ></div>
          <h3
            className={`${
              pathname === "/categories"
                ? "categories-text "
                : pathname.includes("/products") && ""
            } categories-button-text`}
          >
            Categories
          </h3>
        </Link>
      </Paper>
      <Searchbar
        value={value}
        setValue={setValue}
        handelSearch={handelSearch}
      />
      <Box sx={{ display: "flex" }}>
        {user ? (
          <React.Fragment>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar className="!w-9 !h-9 md:!w-[45px] md:!h-[45px]">
                AD
              </Avatar>
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {loginmenu.map((m) => (
                <MenuItem key={m} onClick={onLogout}>
                  <Typography textAlign="center">{m}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar className="!w-9 !h-9 md:!w-[45px] md:!h-[45px] lg:!hidden" />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menu.map((m) => (
                <MenuItem
                  key={m}
                  onClick={() => handleModalOpen(m.toLowerCase())}
                >
                  <Typography textAlign="center">{m}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <ColorButton
              background={
                pathname.includes("/products")
                  ? "#f97316"
                  : pathname === "/categories"
                  ? "#0ea5e9"
                  : pathname.includes("/product/")
                  ? "#22c55e"
                  : ""
              }
              hoverBackground={
                pathname.includes("/products")
                  ? "#ea580c"
                  : pathname === "/categories"
                  ? "#0284c7"
                  : pathname.includes("/product/")
                  ? "#16a34a"
                  : ""
              }
              inverse={true}
              text="Login"
              className="!hidden lg:!block !mr-3"
              customPadding="0.3rem 1.25rem"
              handleClick={() => handleModalOpen("login")}
            ></ColorButton>
            <ColorButton
              background={
                pathname.includes("/products")
                  ? "#f97316"
                  : pathname === "/categories"
                  ? "#0ea5e9"
                  : pathname.includes("/product/")
                  ? "#22c55e"
                  : ""
              }
              hoverBackground={
                pathname.includes("/products")
                  ? "#ea580c"
                  : pathname === "/categories"
                  ? "#0284c7"
                  : pathname.includes("/product/")
                  ? "#16a34a"
                  : ""
              }
              text="Register"
              className="!hidden lg:!block"
              customPadding="0.3rem 1.25rem"
              handleClick={() => handleModalOpen("register")}
            ></ColorButton>
          </React.Fragment>
        )}
      </Box>
      <Modal open={openRegister} onClose={handleClose}>
        <React.Fragment>
          <RegisterModal handleClose={handleClose} />
        </React.Fragment>
      </Modal>
      <Modal open={openLogin} onClose={handleClose}>
        <React.Fragment>
          <LoginModal handleClose={handleClose} />
        </React.Fragment>
      </Modal>
    </div>
  );
};

export default Navbar;
