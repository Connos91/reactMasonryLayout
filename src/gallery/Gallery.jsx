import React, { useState, useEffect } from "react";

import { useInfiniteQuery } from "react-query";
import ImageItem from "../components/ImageItem";
import ImageList from "@mui/material/ImageList";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import InfiniteScroll from "react-infinite-scroller";
import MasonryLayout from "./MasonryLayout";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Item from "./Item";

import * as C from "./constants";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 600,
      lg: 800,
      xl: 1536,
    },
  },
});

const Gallery = () => {
  const [offset, setOffset] = useState(0);

  const [photoList, setPhotoList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const fetchUrl = `${C.PHOTOS_URL}/?offset=${offset}&limit=${C.LIMIT}`;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("lg"));

  const loadMorePhotos = () => {
    axios
      .get(fetchUrl, { ...C.OPTIONS })
      .then((response) => {
        response.data.map((item) => photoList.push(item));

        setPhotoList(photoList);

        if (500 > offset + C.LIMIT) {
          setHasMore(true);
          setOffset(offset + C.LIMIT);
        } else {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  useEffect(() => {
    loadMorePhotos();
  }, []);

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        initialLoad={false}
        loadMore={loadMorePhotos}
        hasMore={hasMore}
        loader={<Skeleton variant="rectangular" width={210} height={118} />}
      >
        <MasonryLayout
          columns={isMobile ? 1 : isTablet ? 2 : isDesktop ? 4 : 5}
          gap={8}
        >
          {photoList?.map((photo) => (
            <Item key={photo.id} photo={photo} />
          ))}
        </MasonryLayout>
      </InfiniteScroll>
    </>
  );
};
export default Gallery;
