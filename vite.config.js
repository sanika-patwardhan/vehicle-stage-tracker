import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "VehicleStageTracker",
      formats: ["es", "umd"],
      fileName: (format) => `vehicle-stage-tracker.${format}.js`
    },
    rollupOptions: {
      external: [
        "react", 
        "react-dom",
        "@emotion/react",
        "@emotion/styled",
        "@mui/material",
        "@mui/icons-material",
        "@mui/x-date-pickers",
        "date-fns"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@mui/material": "MuiMaterial",
          "@mui/icons-material": "MuiIcons",
          "@emotion/react": "emotionReact",
          "@emotion/styled": "emotionStyled",
          "@mui/x-date-pickers": "MuiXDatePickers",
          "date-fns": "dateFns"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
}));