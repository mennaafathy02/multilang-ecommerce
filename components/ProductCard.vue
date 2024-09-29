<script setup lang="ts">
import type { ProductItem } from '~/types/types';

const isFav = ref(true);

const handleFav = () => {
    isFav.value = !isFav.value
}

defineProps({
    item: {
        type: Object as () => ProductItem,
        required: true,
    },
})
</script>
<template>
    <div class="border p-2 rounded">
        <NuxtLinkLocale :to="'/products/' + item.id">
            <NuxtImg :src="item?.image || 'hero_endframe.webp'" class="rounded w-full h-40 object-contain" />
        </NuxtLinkLocale>
        <div class="py-2 h-36 flex flex-col justify-between">
            <p class="lined font-bold h-12">
                {{ item.title || 'product name' }}
            </p>
            <div class="flex justify-between">
                <p class="text-cyan-600 font-semibold">
                    {{ item.price || 500 }}$
                </p>
                <div class="flex gap-2">
                    <div>
                        <Icon @click="handleFav" v-if="isFav" name="mage:heart-fill"
                            class="text-red-500 cursor-pointer size-5" />
                        <Icon @click="handleFav" v-else name="solar:heart-linear"
                            class="text-red-500 cursor-pointer size-5" />
                    </div>
                    <div>
                        <Icon name="mdi:cart" class="cursor-pointer size-5" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.lined {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden
}
</style>