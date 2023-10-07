import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    cors: true, //允许跨域。
    // 设置代理
    proxy: {
      // 将请求代理到另一个服务器
      "/api": {
        target: "http://localhost:8080/", //这是你要跨域请求的地址前缀
        changeOrigin: true, //开启跨域
        // rewrite: (path) => path.replace(/^\/api/, ""), //去除前缀api
      },
    },
  },
});
