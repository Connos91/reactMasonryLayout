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
import PhotoAlbum from "react-photo-album";
import { createApi } from "unsplash-js";
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
  const [loading, setLoading] = useState(false);

  const fetchUrl = `${C.PHOTOS_URL}/?page=${offset}&limit=${C.LIMIT}`;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("lg"));

  const unsplash = createApi({
    accessKey: "FUARWieAAotbsx6MjpYh05wQ5TLA1ENx3iryDRP_DM8",
  });

  const loadMorePhotos = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = "4mB0CC1xdwTfTQGjF1v1uO9vS2Z8ubzBPd4X0B86IEU";

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        setPhotoList([...photoList, ...res.data]);
        setLoading(true);
      });

    /*  unsplash.search.getPhotos({ query: "dogs" }).then((result) => {
      if (result.type === "success") {
        console.log(result.response);
        setPhotoList(result.response.results);
        setLoading(false); */

    /*   if (500 > offset + C.LIMIT) {
          setHasMore(true);
          setOffset(offset + C.LIMIT);
        } else {
          setHasMore(false);
        } */

    /*   }); */
    /*  axios
      .get(fetchUrl)
      .then((response) => {
        response.data.map((item) => photoList.push(item));

        setPhotoList(photoList);
        setTimeout(() => {
          setLoading(false);
        }, 3000);

        if (500 > offset + C.LIMIT) {
          setHasMore(true);
          setOffset(offset + C.LIMIT);
        } else {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
      }); */
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
        hasMore={true}
        loader={
          <img
            src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
            alt="loading"
          />
        }
      >
        {loading ? (
          <MasonryLayout
            columns={isMobile ? 1 : isTablet ? 2 : isDesktop ? 4 : 5}
            gap={8}
          >
            {photoList?.map((photo) => (
              <Item
                key={photo.id}
                placeholder={photo.urls.small}
                src={photo.urls.regular}
              />
            ))}
          </MasonryLayout>
        ) : (
          ""
        )}
      </InfiniteScroll>
    </>
  );
};
export default Gallery;
