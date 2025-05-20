import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "public/service-worker.js",
          dest: "",
        },
      ],
    }),
  ],
  server: {
    port: 5173,
    strictPort: true, // Agar Vite tidak pindah ke port lain jika 5173 sudah digunakan
    host: "localhost", // Bisa diganti dengan '0.0.0.0' jika ingin diakses dari jaringan lokal
    hmr: {
      protocol: "ws", // 'ws' untuk HTTP lokal, 'wss' untuk HTTPS
      host: "localhost",
      port: 5173, // Port HMR biasanya sama dengan server jika tidak dipisah
    },
  },
});
