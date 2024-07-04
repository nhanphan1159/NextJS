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
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'

import envConfig from '@/config'

import { useState } from 'react'

import { Toaster } from '@/components/ui/toaster'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export default function LoginForm() {
    const [isLogin, setLogin] = useState(false)
    const [isModal, setModal] = useState(false)
    const { toast } = useToast()

    // 1. Define your form.
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    // 2. Define a submit handler.
    async function onSubmitLogin(values: LoginBodyType) {
        // saveToLocalStorage(values)
        try {
            // const result = await fetch(
            //     `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
            //     {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(values),
            //     }
            // ).then(async (res) => {
            //     const payload = await res.json()
            //     const data = {
            //         status: res.status,
            //         payload: payload,
            //     }
            //     if (res.status === 200) {
            //         setLogin(!isLogin)
            //         setModal(!isModal)
            //         console.log(isLogin)
            //         setTimeout(() => {
            //             window.location.href = '/'
            //         }, 3000)

            //         return true
            //     } else {
            //         setModal(!isModal)
            //         setLogin(isLogin)
            //     }
            //     return data
            // })
            const result = await fetch(
                `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
                {
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
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
                        window.location.href = '/'
                    }, 3000)
                }
                if (!res.ok) {
                    throw data
                }
                return data
            })
            toast({
                description: result.payload.message,
            })
        } catch (error: any) {
            // const errors = error.patload.errors as {
            //     field: string
            //     message: string
            // }[]
            // const status = error.payload.errors as number
            // if (status === 422) {
            //     errors.forEach((error) => {
            //         form.setError(error.field as 'email' | 'password', {
            //             type: 'server',
            //             message: error.message,
            //         })
            //     })
            // } else {
            //     toast({
            //         variant: 'destructive',
            //         title: `${error.message}`,
            //         description: `${error.payload.message}`,
            //         action: (
            //             <ToastAction altText="Try again">Try again</ToastAction>
            //         ),
            //     })
            // }
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
            } else {
                toast({
                    title: 'Lỗi',
                    description: error.payload.message,
                    variant: 'destructive',
                })
            }
        }

        // handleShowtoast()
    }
    function handleShowtoast() {
        isLogin === false && isModal === true ? (
            toast({
                variant: 'destructive',
                title: 'Uh oh! Failed.',
                description: 'Login fail.2',
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            })
        ) : isLogin === true && isModal === true ? (
            toast({
                title: 'Success.',
                description: 'Login success.',
            })
        ) : (
            <div></div>
        )
    }

    // function saveToLocalStorage(data: LoginBodyType) {
    //     const stringifiedData = JSON.stringify(data)
    //     localStorage.setItem('registrationData', stringifiedData)
    // }
    // function onChangeData(values: LoginBodyType) {
    //     console.log(values)
    //     saveToLocalStorage(values)
    //     // Do something with the form values.
    //     //  This will be type-safe and validated.
    //     // Save the object to localStorage
    // }

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
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmitLogin)}
                    className="space-y-2 w-96"
                >
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
                    <Button
                        variant="outline"
                        type="submit"
                        // onClick={handleShowtoast}
                        // onClick={() => {
                        //     isLogin === false && isModal === true ? (
                        //         toast('Login fail', {
                        //             description: `${new Date().toLocaleString()}`,
                        //             // action: {
                        //             //     label: 'Undo',
                        //             //     onClick: () => console.log('Undo'),
                        //             // },
                        //         })
                        //     ) : isLogin === true && isModal === true ? (
                        //         <div> LogIn success</div>
                        //     ) : (
                        //         <div></div>
                        //     )
                        // }}
                    >
                        Log In
                    </Button>
                </form>
            </Form>
            {/* {isLogin === false && isModal === true ? (
                <div> LogIn fail</div>
            ) : isLogin === true && isModal === true ? (
                <div> LogIn success</div>
            ) : (
                <div></div>
            )} */}

        </div>
    )
}