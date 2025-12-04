// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,                // allows access from network + ngrok
//     strictPort: true,          // keep the port fixed
//     allowedHosts: [
//       "jace-hypercyanotic-distantly.ngrok-free.dev" // your ngrok URL host
//     ]
//   }
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from 'vite-plugin-sitemap'; // Import the sitemap plugin

export default defineConfig({
  plugins: [
    react(),
    Sitemap({ // Add the Sitemap plugin to the plugins array
      hostname: 'www.ganeshakhara.com', // Set your website's domain
    }),
  ],
  server: {
    host: true,                // allows access from network + ngrok
    strictPort: true,          // keep the port fixed
    allowedHosts: [
      "jace-hypercyanotic-distantly.ngrok-free.dev" // your ngrok URL host
    ]
  }
});
