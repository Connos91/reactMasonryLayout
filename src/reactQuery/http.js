/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

import * as C from "./constants";

const get = async (url) => {
  const { data } = await axios.get(url, C.OPTIONS);
  return data;
};

export default { get };
