import {extendTheme} from "@chakra-ui/react";
import "@fontsource/ubuntu";

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({
    config,
    colors: {
        gold: "#ffff00",
        blue: {
            light: "rgba(25, 50, 90, 1)",
            semibold: "rgba(20, 25, 75, 1)",
            bold: "rgba(16, 20, 47, 1)",
        }
    },
    variables: {
        blue: {
            light: "rgba(25, 50, 90, 1)",
            semibold: "rgba(20, 25, 75, 1)",
            bold: "rgba(16, 20, 47, 1)",
        },
        sectionRadius: "1rem",
        cardRadius: "0.65rem",
        sectionBgColor: "rgba(31,39,78,1)",
        cardBgColor: "rgba(31,50,90,1)",
    },
    styles: {
        global: {
            body: {
                background: "rgba(16,20,47,1)",
                fontFamily: "'Ubuntu', sans-serif",
            },
        },
    },
});

export default theme;
