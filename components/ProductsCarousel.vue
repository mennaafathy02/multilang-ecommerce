<script setup lang="ts">
import type { ProductItem } from '~/types/types';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../components/ui/carousel'

const { t, locale } = useI18n()

defineProps({
    category: {
        type: String,
        required: false,
    },
    products: {

        type: Array as () => Array<ProductItem>,
        required: false,

    },
})
</script>

<template>


    <div class="px-20 w-full">
        <h2 :class="[
            'font-bold my-4 text-2xl capitalize',
            locale === 'en' ? 'border-l-[14px] border-red-700 pl-2' : 'border-r-[14px] text-right border-red-700 pr-2'
        ]">
            {{ category }}

        </h2>
        <Carousel>
            <CarouselContent class="-ml-2 md:-ml-4">
                <CarouselItem v-for="(item, index) in products" :key="index"
                    class="overflow-hidden md:pl-4 sm:basis-1/2 md:basis-1/4 lg:basis-1/5">
                    <ProductCard :item="item" />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        <Button v-if="!$route.name?.toString().includes('category')" class="block my-20 mx-auto"
            @click="navigateTo(`/products/${category}`)">
            {{ t('view_all_products') }}
        </Button>
    </div>
</template>