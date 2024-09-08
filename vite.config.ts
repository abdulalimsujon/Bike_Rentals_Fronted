import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "bg-green-700", // Customize primary color
          "link-color": "#1890ff", // Customize link color
          "border-radius-base": "4px", // Customize border radius
        },
        javascriptEnabled: true,
      },
    },
  },
});
