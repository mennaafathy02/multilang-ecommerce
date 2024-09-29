<script setup lang="ts">
import * as z from 'zod'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
const { t } = useI18n()

const schema = toTypedSchema(z.object({
    username: z
        .string({
            required_error: t('field_req'),
        })
        .min(2, {
            message: t('min_2'),
        }),
    firstName: z
        .string({
            required_error: t('field_req'),
        })
        .min(2, {
            message: t('min_2'),
        }),
    secondName: z
        .string({
            required_error: t('field_req'),
        })
        .min(2, {
            message: t('min_2'),
        }),
    email: z
        .string({
            required_error: t('field_req'),
        })
        .min(2, {
            message: t('min_2'),
        }),
    phone: z
        .string({
            required_error: t('field_req'),
        })
        .min(2, {
            message: t('min_2'),
        }),

    password: z
        .string({
            required_error: t('field_req'),
        })
        .min(6, {
            message: t('min_pass_6'),
        }),
}))


const { handleSubmit } = useForm({
    validationSchema: schema,
})

const onSubmit = handleSubmit(async (values: Record<string, any>) => {
    try {
        values = { ...values, name: values.firstName + values.secondName }
        console.log(values)
        // Sending login data to the API using useFetch
        const data = await $fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            body: values,
        })
        toast({
            title: t('success'),
            description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(data, null, 2))),
        })
        console.log(data)
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
        <NuxtImg src="/sideImage.webp" class="h-full object-cover w-full hidden md:block" />
        <div class="px-4 sm:px-12 py-16">
            <h2 class="mb-14 font-bold text-xl">
                {{ t('signup_to_exc') }}
            </h2>
            <p class="mb-12">
                {{ t('enter_ur_details') }}
            </p>
            <form class="space-y-6" @submit.prevent="onSubmit">
                <div class="flex gap-2">
                    <FormField v-slot="{ componentField }" name="firstName">
                        <FormItem>
                            <FormControl>
                                <Input
                                    class="focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent border-t-0 border-l-0 border-r-0 rounded-none border-b-2"
                                    type="text" :placeholder="t('firstName')" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="secondName">
                        <FormItem>
                            <FormControl>
                                <Input
                                    class="focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent border-t-0 border-l-0 border-r-0 rounded-none border-b-2"
                                    type="text" :placeholder="t('secondName')" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
                <FormField v-slot="{ componentField }" name="username">
                    <FormItem>
                        <FormControl>
                            <Input
                                class="focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent border-t-0 border-l-0 border-r-0 rounded-none border-b-2"
                                type="text" :placeholder="t('username')" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormControl>
                            <Input
                                class="focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent border-t-0 border-l-0 border-r-0 rounded-none border-b-2"
                                type="text" :placeholder="t('email')" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="phone">
                    <FormItem>
                        <FormControl>
                            <Input
                                class="focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent border-t-0 border-l-0 border-r-0 rounded-none border-b-2"
                                type="text" :placeholder="t('phone')" v-bind="componentField" />
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
                        {{ t('signup') }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>