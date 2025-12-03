import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                // allows access from network + ngrok
    strictPort: true,          // keep the port fixed
    allowedHosts: [
      "jace-hypercyanotic-distantly.ngrok-free.dev" // your ngrok URL host
    ]
  }
});
