import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "./style.css";

const Item = ({ placeholder, src }) => {
  console.log("Photo");
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(img.src);
    };
  }, [src]);

  const customClass =
    placeholder && imgSrc === placeholder ? "loading" : "loaded";

  return (
    <>
      <Card variant="outlined">
        <CardMedia
          component="img"
          className={`image ${customClass}`}
          image={src}
        />

        <CardContent>Test</CardContent>
      </Card>
    </>
  );
};

export default Item;
