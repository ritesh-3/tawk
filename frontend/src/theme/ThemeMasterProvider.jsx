import PropTypes from 'prop-types';
import { useContext, useMemo } from 'react';
import { alpha, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { GlobalContext } from '../contexts/GlobalContexts';
import ComponentsOverrides from './overrides';
import palette from "./palette.jsx";
import typography from "./typography.jsx";
import breakpoints from "./breakpoints.jsx";
import componentsOverride from "./overrides/index.jsx";
import shadows, { customShadows } from "./shadows.jsx";

ThemeMasterProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeMasterProvider({ children }) {
    const { themeMode, setColor } = useContext(GlobalContext);

    const isLight = themeMode === 'light';

    const themeOptions = useMemo(() => {
        const baseTheme = createTheme({
            palette: isLight ? palette.light : palette.dark,
            typography,
            breakpoints,
            shape: { borderRadius: 8 },
            shadows: isLight ? shadows.light : shadows.dark,
            customShadows: isLight ? customShadows.light : customShadows.dark,
        });

        return {
            ...baseTheme,
            palette: {
                ...baseTheme.palette,
                primary: setColor,
            },
            customShadows: {
                ...baseTheme.customShadows,
                primary: `0 8px 16px 0 ${alpha(setColor.main, 0.24)}`,
            },
        };
    }, [isLight, setColor]);

    const theme = createTheme(themeOptions);
    theme.components = ComponentsOverrides(theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
