// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";

export default function UserMenu() {
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext);
  const [anChorEl, setAnchorEl] = useState(null);
  const open = Boolean(anChorEl);

  const handleLogout = () => {
    auth.signOut();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  return (
    <>
      <Box sx={{ display: "flex" }} onClick={handleClick}>
        <Typography>{displayName}</Typography>
        <Avatar
          alt="avatar"
          src={photoURL}
          sx={{ width: 24, height: 24, marginLeft: "5px" }}
        />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anChorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
