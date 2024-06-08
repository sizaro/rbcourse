import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product1: resolve(
          __dirname,
          "src/product_pages/diary.html"
        ),
        product2: resolve(__dirname, "src/product_pages/fruits.html"),
        product3: resolve(
          __dirname,
          "src/product_pages/grains.html"
        ),
        product4: resolve(
          __dirname,
          "src/product_pages/household.html"
        ),
        product5: resolve(
          __dirname,
          "src/product_pages/spices.html"
        ),
        product6: resolve(
          __dirname,
          "src/product_pages/vegetables.html"
        ),
      },
    },
  },
});
