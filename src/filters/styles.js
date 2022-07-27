/* import { makeStyles } from "@mui/material/styles";
 */ import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: "blue",
      paddingBottom: "10px",
      flexGrow: 1,
    },
  }),
  { name: "Filters" }
);

export default useStyles;
