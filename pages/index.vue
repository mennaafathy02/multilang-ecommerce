<script setup lang="ts">
const { data: categories } = useFetch('https://fakestoreapi.com/products/categories')
const cateProducts = ref<{ category: string, products: any[] }[]>([])

// Check if categories are loaded and process them
watchEffect(() => {
    if (categories.value) {
        const categoriesArray = categories.value as string[]

        categoriesArray.forEach(async (cate) => {
            const categoryProducts = await $fetch<any[]>(`https://fakestoreapi.com/products/category/${cate}`)
            cateProducts.value.push({
                category: cate,
                products: categoryProducts || []
            })
        })
    }
})

console.log(cateProducts.value)


</script>

<template>
    <Hero />
    <div :class="`py-4 ${index % 2 == 0 ? ' bg-slate-50' : ''}`" v-for="(item, index) in cateProducts" :key="index">
        <ProductsCarousel :category="item.category" :products="item.products" />
    </div>
</template>