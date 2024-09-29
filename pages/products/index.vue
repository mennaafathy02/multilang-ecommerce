<script lang="ts" setup>
import { Input } from '@/components/ui/input'

import type { ProductItem } from '~/types/types'




const productsStore = useProducts()
const { setProducts } = productsStore

const { data: allProducts } = await useFetch('https://fakestoreapi.com/products')
const productArray = Object.values(allProducts.value as Record<string, ProductItem>); // Convert object of objects to array
setProducts(productArray);


const searchQuery = ref('');

const filterProducts = (query: string) => {
    const filteredProducts = productArray.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );
    productsStore.setProducts(filteredProducts);
}


watch(searchQuery, (newQuery) => {
    filterProducts(newQuery);
});


const { t } = useI18n()
</script>

<template>
    <div class="py-10">
        <div class="flex border rounded-lg">
            <Input v-model="searchQuery" class="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                type="text" :placeholder="t('search')" />
            <Icon name="mdi:search" class="size-7 my-auto mx-2" />
        </div>
    </div>
    <div class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4">
        <ProductCard v-for="product in productsStore.products" :item="product" :key="product.id" />
    </div>
</template>