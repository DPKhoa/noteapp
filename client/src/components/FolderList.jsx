/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Box, Card, CardContent, List, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";

// eslint-disable-next-line react/prop-types
export default function FolderList({ folders }) {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  // console.log({ folderId });
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folder
          </Typography>
          <NewFolder />
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{
              textDecoration: "none",
            }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
                mb: "5px",
                bgcolor: id === activeFolderId ? "rgb(255 211 140 )" : null,
              }}
            >
              <CardContent
                sx={{ "&:last-child:": { pb: "10px" }, padding: "10px" }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
