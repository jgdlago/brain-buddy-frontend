import { definePreset } from "@primevue/themes";
import Aura from "@primeuix/themes/aura";

// Cor Principal
// FFF5C67C; Dourado
// #e3a84b hover

// Contraste
// FF78C2F5; // Azul
// FFF78DBF; // Rosa
// FF80E0A7; // Verde
// FFA27BE; // Roxo

// Base
// FF2D2D2D; // Preto
// B3FFFFFF; // Branco

// Feedback
// FF4CAF50; // Confirmação
// FFE57373; // Negação
// FFFFB74D; // Alerta

/* 
#f5c67c   dourado
#e6b35c   dourado hover
#d9a648   dourado active
*/

const l = {
  white: "#ffffff",
  lgGray: "#f5f5f5",
  lgGold: "#f5c67c",
  mdGold: "#e6b35c",
  dkGold: "#d9a648",
  blue: "#5b9bd5",
  dkBlue: "#0a0e4f",
  red: "#e57373",
};

const d = {
  light: "#1f1f23",
  dark: "#121215",
  darker: "#0e0e11",
};

export const ColorScheme = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          background: l.lgGray, //fundo
          backgroundContrast: l.white, //contraste do fundo
          header: l.blue, //header
          color: l.lgGold, //principal
          inverseColor: l.white, //contraste na header
          hoverColor: l.mdGold, //hover
          activeColor: l.dkGold, //active
          danger: l.red, //danger
          contrastText: l.dkBlue,
        },
        highlight: {
          background: l.lgGold, //focado
          focusBackground: l.mdGold, //focado dps de hover em outro item
          color: l.white, //texto
          focusColor: l.white, //texto dps de hover
        },
      },
      dark: {
        primary: {
          background: d.darker, //fundo
          backgroundContrast: d.dark, //contraste do fundo
          header: d.light, //header
          color: l.dkGold, //principal
          inverseColor: l.white, //contraste na header
          hoverColor: l.mdGold, //hover
          activeColor: l.lgGold, //active
          danger: l.red, //danger
          contrastText: l.lgGray,
        },
        highlight: {
          background: l.mdGold, //focado
          focusBackground: l.dkGold, //focado dps de hover em outro item
          color: l.white, //texto
          focusColor: l.white, //texto dps de hover
        },
      },
    },
  },
});
