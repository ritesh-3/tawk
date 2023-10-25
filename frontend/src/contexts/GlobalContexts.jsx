// provider === component
import { createContext, useEffect } from "react";
// import { defaultSettings } from "../config";
import useLocalStorage from "../hooks/useLocalStorage";
import getColorPresets, { colorPresets, defaultPreset } from "../utils/getColorPresets";

const defaultSettings = {
    themeMode: "dark",
    themeColorPresets: "default",
};

const initialState = {
    ...defaultSettings,
    // Mode
    onToggleMode: () => { },
    onChangeMode: () => { },

    // Color
    onChangeColor: () => { },
    setColor: defaultPreset,
    colorOption: [],

    // Reset
    onResetSetting: () => { },
};

const GlobalContext = createContext(initialState);

const GlobalContextProvider = ({ children }) => {
    const [settings, setSettings] = useLocalStorage("settings", {
        themeMode: initialState.themeMode,
        themeColorPresets: initialState.themeColorPresets,
    });

    // const onToggleMode = () => {
    //     setSettings({
    //         ...settings,
    //         themeMode: settings.themeMode === "light" ? "dark" : "light",
    //     });
    // };

    // // Color

    // const onChangeColor = (value) => {
    //     setSettings({
    //         ...settings,
    //         themeColorPresets: value,
    //     });
    // };

    const onToggleMode = () => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            themeMode: prevSettings.themeMode === "light" ? "dark" : "light",
        }));
    };

    const onChangeColor = (value) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            themeColorPresets: value,
        }));
    };

    const onChangeMode = (value) => {
        setSettings({
            ...settings,
            themeMode: value,
        });
    };



    const onResetSetting = () => {
        setSettings({
            themeMode: initialState.themeMode,
        });
    };

    return (
        <GlobalContext.Provider
            value={{
                ...settings, // Mode
                onToggleMode,
                onChangeMode,
                // Color
                onChangeColor,
                setColor: getColorPresets(settings.themeColorPresets),
                colorOption: colorPresets.map((color) => ({
                    name: color.name,
                    value: color.main,
                })),
                // Reset
                onResetSetting,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext };

export default GlobalContextProvider;