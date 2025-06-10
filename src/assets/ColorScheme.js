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
  dkBlue: "{teal.900}",
  red: "#e57373",
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
          darkBlue: l.dkBlue,
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
          color: "{zinc.50}",
          inverseColor: "{zinc.950}",
          hoverColor: "{zinc.100}",
          activeColor: "{zinc.200}",
          50: "{zinc.950}",
          100: "{zinc.900}",
          200: "{zinc.800}",
          300: "{zinc.700}",
          400: "{zinc.600}",
          500: "{zinc.500}",
          600: "{zinc.400}",
          700: "{zinc.300}",
          800: "{zinc.200}",
          900: "{zinc.100}",
          950: "{zinc.50}",
        },
        highlight: {
          background: "rgba(250, 250, 250, .16)",
          focusBackground: "rgba(250, 250, 250, .24)",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)",
        },
      },
    },
  },
});
