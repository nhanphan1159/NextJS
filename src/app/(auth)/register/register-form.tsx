'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { Button } from '@/components/ui/button'
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Flex } from 'antd'

import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'

import envConfig from '@/config'
// import { redirect } from 'next/navigation'
// import { Toaster } from '@/components/ui/toaster'
// import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export default function RegisterForm() {
    const { toast } = useToast()

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
    async function onSubmitRegister(values: RegisterBodyType) {
        saveToLocalStorage(values)
        try {
            const result = await fetch(
                `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                }
            ).then(async (res) => {
                const payload = await res.json()
                const data = {
                    status: res.status,
                    payload,
                }
                if (res.status === 200) {
                    // setLogin(!isLogin)
                    // setModal(!isModal)
                    // console.log(isLogin)
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 1000)
                }
                if (!res.ok) {
                    throw data
                }
                return data
            })
            console.log(result.payload.message)
            toast({
                description: result.payload.message,
            })
        } catch (error: any) {
            const errors = error.payload.errors as {
                field: string
                message: string
            }[]
            const status = error.status as number
            if (status === 422) {
                errors.forEach((error) => {
                    form.setError(error.field as 'email' | 'password', {
                        type: 'server',
                        message: error.message,
                    })
                })
                toast({
                    title: 'Lỗi',
                    description: 'RegisterFail: Password not same',
                    variant: 'destructive',
                })
            } 
            // else {
            //     toast({
            //         title: 'Lỗi',
            //         description: error.payload.message,
            //         variant: 'destructive',
            //     })
            // }
        }
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
        // <Form {...form}>
        //     <form
        //         onSubmit={form.handleSubmit(onSubmit)}
        //         className="space-y-2 w-96"
        //     >
        //         <FormField
        //             control={form.control}
        //             name="name"
        //             render={({ field }) => (
        //                 <FormItem>
        //                     <FormLabel>Name</FormLabel>
        //                     <FormControl>
        //                         <Input
        //                             placeholder="name"
        //                             type="text"
        //                             {...field}
        //                         />
        //                     </FormControl>

        //                     <FormMessage />
        //                 </FormItem>
        //             )}
        //         />
        //         <FormField
        //             control={form.control}
        //             name="email"
        //             render={({ field }) => (
        //                 <FormItem>
        //                     <FormLabel>Email</FormLabel>
        //                     <FormControl>
        //                         <Input
        //                             required
        //                             placeholder="email"
        //                             type="email"
        //                             {...field}
        //                         />
        //                     </FormControl>

        //                     <FormMessage />
        //                 </FormItem>
        //             )}
        //         />
        //         <FormField
        //             control={form.control}
        //             name="password"
        //             render={({ field }) => (
        //                 <FormItem>
        //                     <FormLabel>Password</FormLabel>
        //                     <FormControl>
        //                         <Input
        //                             required
        //                             placeholder="password"
        //                             type="password"
        //                             {...field}
        //                         />
        //                     </FormControl>

        //                     <FormMessage />
        //                 </FormItem>
        //             )}
        //         />
        //         <FormField
        //             control={form.control}
        //             name="confirmPassword"
        //             render={({ field }) => (
        //                 <FormItem>
        //                     <FormLabel>Confirm Password</FormLabel>
        //                     <FormControl>
        //                         <Input
        //                             required
        //                             placeholder="confirmPassword"
        //                             type="password"
        //                             {...field}
        //                         />
        //                     </FormControl>

        //                     <FormMessage />
        //                 </FormItem>
        //             )}
        //         />
        //         <Button type="submit">Đăng ký</Button>
        //     </form>
        // </Form>
        <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onSubmitRegister}
        >
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Name!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="name"
                    placeholder="Name"
                />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder="email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your confirmPassword!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Confirm Password"
                />
            </Form.Item>
            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Register
                </Button>
                or <a href="/Login">Login now!</a>
            </Form.Item>
        </Form>
    )
}
