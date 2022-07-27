/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQueryClient } from "react-query";

import * as C from "./constants";

const getPhotosDetails = (terminalId) => {
  const queryClient = useQueryClient();
  return (
    queryClient.getQueryData([C.DETAILS_QUERY_KEY, terminalId]) ||
    C.DETAILS_DEFAULTS
  );
};

export default {
  getPhotosDetails,
};
