// eslint-disable-next-line no-unused-vars
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { CreateNewFolderOutlined } from "@mui/icons-material";

export default function NewFolder() {
  const [newFolderName, setNewFolderName] = useState();
  const handleOpenPopUp = () => {};
  const handleNewFolderNameChange = () => {};
  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopUp}>
        <IconButton size="small">
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          ></TextField>
        </DialogContent>
      </Dialog>
    </div>
  );
}
