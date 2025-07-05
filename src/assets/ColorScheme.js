import { definePreset } from "@primevue/themes";
import Aura from "@primeuix/themes/aura";

const c = {
  white: "#ffffff",
  lgGray: "#f5f5f5",
  lgGold: "#f5c67c",
  mdGold: "#e6b35c",
  dkGold: "#d9a648",
  lgBlue: "#2e50b0",
  blue: "#2e5ab0",
  dkBlue: "#1b3e6f",
  red: "#e57373",
  pink: "#f49ecb",
  lightDark: "#1f1f23",
  dark: "#121215",
  darker: "#0e0e11",
};

export const ColorScheme = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          background: c.lgGray, //fundo
          backgroundContrast: c.white, //contraste do fundo
          header: c.blue, //header
          color: c.blue, //principal
          inverseColor: c.white, //contraste na header
          hoverColor: c.dkBlue, //hover
          activeColor: c.lgBlue, //active
          danger: c.red, //danger
          contrastText: c.dkBlue,
        },
        highlight: {
          background: c.lgBlue, //focado
          focusBackground: c.blue, //focado dps de hover em outro item
          color: c.white, //texto
          focusColor: c.white, //texto dps de hover
        },
      },
      dark: {
        primary: {
          background: c.darker, //fundo
          backgroundContrast: c.dark, //contraste do fundo
          header: c.light, //header
          color: c.dkGold, //principal
          inverseColor: c.white, //contraste na header
          hoverColor: c.mdGold, //hover
          activeColor: c.lgGold, //active
          danger: c.red, //danger
          contrastText: c.lgGray,
        },
        highlight: {
          background: c.mdGold, //focado
          focusBackground: c.dkGold, //focado dps de hover em outro item
          color: c.white, //texto
          focusColor: c.white, //texto dps de hover
        },
      },
    },
  },
});
