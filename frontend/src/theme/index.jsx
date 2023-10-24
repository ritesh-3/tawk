import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
//
import palette from "./palette.jsx";
import typography from "./typography.jsx";
import breakpoints from "./breakpoints.jsx";
import componentsOverride from "./overrides/index.jsx";
import shadows, { customShadows } from "./shadows.jsx";
import { GlobalContext } from "../contexts/GlobalContexts.jsx";

// ----------------------------------------------------------------------

// ThemeProvider.propTypes = {
//   children: PropTypes.node,
// };

export default function ThemeProvider({ children }) {
  const { themeMode } = useContext(GlobalContext)

  const isLight = themeMode === "light";

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
