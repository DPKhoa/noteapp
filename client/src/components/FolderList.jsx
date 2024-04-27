/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Box, Card, CardContent, List, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function FolderList({ folders }) {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#7D9D9C",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folder
          </Typography>
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ mb: "5px" }}>
              <CardContent
                sx={{ "&:last-child:": { pb: "10px" }, padding: "10px" }}
              >
                <Typography>{name}</Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
