import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";

const Item = ({ photo }) => {
  console.log(photo);

  return (
    <>
      <Card variant="outlined">
        <CardMedia
          component="img"
          image={photo.download_url}
          alt={photo.author}
        />
        <CardContent>Test</CardContent>
      </Card>
    </>
  );
};

export default Item;
