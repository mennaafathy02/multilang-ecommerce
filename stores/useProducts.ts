import type { ProductItem } from "~/types/types";

// In your store file
export const useProducts = defineStore('products', {
  state: () => {
    return {
      products: [] as ProductItem[],
    }
  },
  actions: {
    setProducts(products:any) {
      this.products = products;
    },
    // Add any other actions if necessary
  },
});
