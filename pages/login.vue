<script setup lang="ts">
import * as z from 'zod'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
const { t } = useI18n()
interface LoginResponse {
    token: string;
}
const schema = toTypedSchema(z.object({
    username: z
        .string({
            required_error: 'Username is required.',
        })
        .min(2, {
            message: 'Username must be at least 2 characters.',
        }),

    password: z
        .string({
            required_error: 'Password is required.',
        })
        .min(6, {
            message: 'Password must be at least 6 characters.',
        }),

}))


const { handleSubmit } = useForm({
    validationSchema: schema,
})

const router = useRouter()

const onSubmit = handleSubmit(async (values: Record<string, any>) => {
    try {
        const data = await $fetch<LoginResponse>('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            body: values,
        })
        toast({
            title: t('success'),
            description: h('p', { class: 'mt-2 w-[340px] rounded-md' }, h('p', { class: 'text-green-700 capitalize' }, t('login_success'))),
        })
        localStorage.setItem('token', data.token)

        router.push('/')

    } catch (err) {
        if (err instanceof z.ZodError) {
            toast({
                title: t('error'),
                description: err.message,
            })
        } else {
            toast({
                title: t('error'),
                description: t('unknown_err'),
            })
        }
    }

})
</script>
<template>

    <div class="grid md:grid-cols-2 grid-cols-1 gap-2 items-center justify-between">
        <NuxtImg src="/sideImage.webp" class="h-full object-cover w-full hidden md:block " />
        <div class="px-4 sm:px-12 py-16">
            <h2 class="mb-14 font-bold text-xl">
                {{ t('login_to_exc') }}
            </h2>
            <p class="mb-12">
                {{ t('enter_ur_details') }}
            </p>
            <form class="space-y-6" @submit.prevent="onSubmit">
                <FormField v-slot="{ componentField }" name="username">
                    <FormItem>
                        <FormControl>
                            <Input
                                class="focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent border-t-0 border-l-0 border-r-0 rounded-none border-b-2"
                                type="text" :placeholder="t('nameOrPhone')" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <FormControl>
                            <Input
                                class="focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent border-t-0 border-l-0 border-r-0 rounded-none border-b-2"
                                type="password" :placeholder="t('password')" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <div>
                    <Button type="submit" class="px-8 bg-red-600 hover:bg-red-700">
                        {{ t('login') }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>