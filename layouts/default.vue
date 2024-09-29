<script setup lang="ts">
const { locale } = useI18n()
</script>
<template>
    <div :dir="locale == 'ar' ? 'rtl' : 'ltr'">

        <Header />
        <main class=" py-8 overflow-hidden">
            <slot />
        </main>
        <Toaster />
    </div>

</template>
