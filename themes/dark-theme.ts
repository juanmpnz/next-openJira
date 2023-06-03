import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
  //       MuiAppBar: {
  //     defaultProps: { elevation: 10 },
  //   },  
  // en este caso estoy cambiando los estilos de bg del componente app bar de mui
  // MuiAppBar: {
  //     defaultProps: {},
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: "red"
  //       }
  //     }
  //   }  
  },
});
