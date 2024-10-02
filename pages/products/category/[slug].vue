<script setup lang="ts">
import type { ProductItem } from '~/types/types';

const route = useRoute()

const { data: categoryProducts } = useFetch<Record<string, ProductItem> | null>(`https://fakestoreapi.com/products/category/${route.params.slug}`)
// Convert the Record to an array and handle the null case
const productsArray = computed(() => {
    return categoryProducts.value ? Object.values(categoryProducts.value) : [];
});

</script>
<template>
    <div class="px-10 font-bold text-xl capitalize mb-8">
        {{ $route.params.slug }}
    </div>
    <ProductsCarousel :products="productsArray" />

</template>