'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'

import envConfig from '@/config'
import { redirect } from 'next/navigation'

export default function RegisterForm() {
    // 1. Define your form.
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: RegisterBodyType) {
        saveToLocalStorage(values)
        const result = await fetch(
            `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    window.location.href = '/login'
                }
            })
            .catch((err) => console.log(err))
    }

    function saveToLocalStorage(data: RegisterBodyType) {
        const stringifiedData = JSON.stringify(data)
        localStorage.setItem('registrationData', stringifiedData)
    }
    function onChangeData(values: RegisterBodyType) {
        console.log(values)
        saveToLocalStorage(values)
        // Do something with the form values.
        //  This will be type-safe and validated.
        // Save the object to localStorage
    }

    // funtion changeData action set localStorage value input

    // function savel(...prop: any) {
    //     //set localStorage value input
    //     console.log(prop)
    //     localStorage.setItem('name', prop[0].target.value)
    //     localStorage.setItem('email', prop[0].target.value)
    //     localStorage.setItem('password', prop[0].target.value)
    //     localStorage.setItem('confirmPassword', prop[0].target.value)
    // }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 w-96"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="name"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="email"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="confirmPassword"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Đăng ký</Button>
            </form>
        </Form>
    )
}
