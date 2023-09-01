import { createTheme } from "@mui/material/styles";

export const shades = {
    primary: {
        100: "#d6d6d6",
        200: "#adadad",
        300: "#858585",
        400: "#5c5c5c",
        500: "#333333",
        600: "#292929",
        700: "#1f1f1f",
        800: "#141414",
        900: "#0a0a0a"
    },

    secondary: {
        100: "#fdf5f6",
        200: "#fcebed",
        300: "#fae0e4",
        400: "#f9d6db",
        500: "#f7ccd2",
        600: "#c6a3a8",
        700: "#947a7e",
        800: "#635254",
        900: "#31292a"
    },

    neutral: {
        100: "#f7ccd2",
        200: "#ef99a4",
        300: "#e66677",
        400: "#de3349",
        500: "#d6001c",
        600: "#ab0016",
        700: "#800011",
        800: "#56000b",
        900: "#2b0006"
    }

};

export const theme = createTheme({
    palette: {
        primary: {
            main: shades.primary[500],
        },
        secondary: {
            main: shades.secondary[500]
        },
        neutral: {
            dark: shades.neutral[700],
            main: shades.neutral[500],
            light: shades.neutral[100]
        }
    },
    typography: {
        fontFamily: ["Fauna One", "sans-serif"].join(","),
        fontSize: 11,
        h1: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize: 48,
        },
        h2: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize: 36,
        },
        h3: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize: 20,
        },
        h4: {
            fontFamily: ["Cinzel", "sans-serif"].join(","),
            fontSize: 14,
        },
    }
});
