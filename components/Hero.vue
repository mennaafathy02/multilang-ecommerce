<script lang="ts" setup>
const { data: categories } = await useFetch('https://fakestoreapi.com/products/categories')
const { t } = useI18n()
</script>

<template>
    <div class="py-10 sm:px-10 grid grid-cols-12 gap-4 items-start">
        <div class="sm:col-span-2 col-span-12">
            <ul class="flex w-full sm:flex-col justify-between">
                <h2 class="p-2 capitalize font-bold mb-2 sm:border-b">
                    {{ t('categories') }}
                </h2>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" class="sm:h-8 sm:hidden p-0 border-none hover:bg-transparent">
                            <Icon name="material-symbols:menu" class="size-7 my-auto" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56">

                        <DropdownMenuGroup>
                            <DropdownMenuItem v-for="cate in categories">
                                <span>{{ cate }}</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>
                <li v-for="cate in categories" class="p-2 hidden sm:block hover:bg-slate-50 cursor-pointer capitalize">
                    <NuxtLinkLocale :to="'/products/category/' + cate">
                        {{ cate }}
                    </NuxtLinkLocale>
                </li>
            </ul>
        </div>
        <div class="sm:col-span-10 col-span-12">
            <NuxtLinkLocale to="/products">
                <NuxtImg src="hero.webp" class="my-auto w-full rounded" />
            </NuxtLinkLocale>
        </div>
    </div>
</template>