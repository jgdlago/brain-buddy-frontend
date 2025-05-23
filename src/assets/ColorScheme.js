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

export const ColorScheme = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          color: "#f5c67c",
          inverseColor: "#ffffff",
          hoverColor: "#e6b35c",
          activeColor: "#d9a648",
          50: "{teal.50}",
          100: "{teal.100}",
          200: "{teal.200}",
          300: "{teal.300}",
          400: "{teal.400}",
          500: "{teal.500}",
          600: "{teal.600}",
          700: "{teal.700}",
          800: "{teal.800}",
          900: "{teal.900}",
          950: "{teal.950}",
        },
        highlight: {
          background: "{teal.950}",
          focusBackground: "{teal.700}",
          color: "#ffffff",
          focusColor: "#ffffff",
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
