<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale, locales, t } = useI18n()

const AvailLocales = computed(() => {
    return locales.value.filter(i =>
        i.code !== locale.value
    )
})

const token = ref('')
const isAuth = computed(() => !!token.value)


if (import.meta.client) {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
        token.value = storedToken
    }
}
</script>

<template>
    <ClientOnly>
        <div class="flex items-center justify-between gap-2 px-6 py-4">
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="sm:h-8 sm:hidden p-0 border-none hover:bg-transparent">
                        <Icon name="material-symbols:menu" class="size-7 my-auto" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">

                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <span>
                                <NuxtLinkLocale to="/">{{ t('home') }}</NuxtLinkLocale>
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>
                                <NuxtLinkLocale to="/products">{{ t('products') }}</NuxtLinkLocale>
                            </span>
                        </DropdownMenuItem>

                    </DropdownMenuGroup>
                    <DropdownMenuSeparator v-if="!isAuth" />
                    <DropdownMenuGroup v-if="!isAuth">
                        <DropdownMenuItem>
                            <span>
                                <NuxtLinkLocale class="p-2" to="/login">{{ t('login') }}</NuxtLinkLocale>
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>
                                <NuxtLinkLocale class="p-2" to="/signup">{{ t('signup') }}</NuxtLinkLocale>
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>
            <div>
                <NuxtLinkLocale to="/" class="font-bold">{{ t('exclusive') }}</NuxtLinkLocale>
            </div>
            <ul class="hidden sm:flex gap-2">
                <li>
                    <NuxtLinkLocale to="/">{{ t('home') }}</NuxtLinkLocale>
                </li>
                <li>
                    <NuxtLinkLocale to="/products">{{ t('products') }}</NuxtLinkLocale>
                </li>


            </ul>

            <div class=" flex gap-2">
                <Button class="p-0 bg-transparent hover:bg-transparent sm:h-6 my-auto" v-for="locale in AvailLocales">
                    <NuxtLink :key="locale.code" :to="switchLocalePath(locale.code)">
                        <Icon v-if="locale.code == 'ar'" name="emojione-v1:flag-for-saudi-arabia" class="size-12" />
                        <Icon v-else name="cif:us" class="size-12" />
                    </NuxtLink>
                </Button>
                <div v-if="!isAuth" class="flex gap-2">

                    <Button class="px-1 hidden sm:block sm:h-9 h-9">
                        <NuxtLinkLocale class="p-2" to="/login">{{ t('login') }}</NuxtLinkLocale>
                    </Button>
                    <Button
                        class="px-1 hidden sm:block sm:h-9 h-9 bg-transparent hover:bg-slate-50 text-black border-black border">
                        <NuxtLinkLocale class="p-2" to="/signup">{{ t('signup') }}</NuxtLinkLocale>
                    </Button>
                </div>
                <DropdownMenu v-else>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" class="sm:h-8 p-0 border-none hover:bg-transparent">
                            <Icon name="heroicons:user-20-solid" class="size-7 my-auto" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56">
                        <DropdownMenuLabel>{{ t('my_account') }}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <span>
                                    <NuxtLinkLocale to="/profile">{{ t('profile') }}</NuxtLinkLocale>
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <span>
                                    <NuxtLinkLocale to="/cart">{{ t('cart') }}</NuxtLinkLocale>
                                </span>
                            </DropdownMenuItem>

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <span>{{ t('logout') }}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </ClientOnly>
</template>
