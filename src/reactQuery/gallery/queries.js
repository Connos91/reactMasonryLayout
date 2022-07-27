import http from "../http";
import * as C from "./constants";

export const getPhotos = (page, limit) => {
  const url = `${C.PHOTOS_URL}?page=${page}&limit=${limit}`;
  return http.get(url);
};
