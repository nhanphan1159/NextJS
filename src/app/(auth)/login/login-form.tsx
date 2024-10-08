'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { Button } from '@/components/ui/button'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import envConfig from '@/config'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Flex } from 'antd'

import { useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import { useAppContext } from '@/app/AppProvider'
import LoginPage from './page'

export default function LoginForm() {
    const { toast } = useToast()
    const { setSessionToken } = useAppContext()

    // 1. Define your form.
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    // console.log(envConfig.NEXT_PUBLIC_API_ENDPOINT)

    // 2. Define a submit handler.
    async function onSubmitLogin(values: LoginBodyType) {
        try {
            ////////////////////////////////////////////////////////
            const result = await fetch(
                `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
                {
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                }
            )
                .then(async (res) => {
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
                            window.location.href = '/me'
                        }, 3000)
                    }
                    if (!res.ok) {
                        throw data
                    }
                    return data
                })
                .catch((error) => {
                    throw error
                })
            toast({
                description: result.payload.message,
            })
            const resultFromNextServer = await fetch('/api/auth', {
                method: 'POST',
                body: JSON.stringify(result),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(async (res) => {
                const payload = await res.json()
                const data = {
                    status: res.status,
                    payload,
                }
                if (!res.ok) {
                    throw data
                }
                return data
            })
            setSessionToken(resultFromNextServer.payload.data.token)
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
                    description: error.payload.message,
                    variant: 'destructive',
                })
            }
            // } else {
            //     toast({
            //         title: 'Lỗi',
            //         description: error.payload.message,
            //         variant: 'destructive',
            //     })
            // }
        }
    }
    // const onFinish = (values) => {
    //   console.log("Success:", values);
    //   //Can directly call props here
    // };

    // const onFinishFailed = (errorInfo) => {
    //   console.log("Failed:", errorInfo);
    // };

    return (
        <div>
            {/* <Form {...form}>
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
                  <Input required placeholder="email" type="email" {...field} />
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
          <Button variant="outline" type="submit">
            Log In
          </Button>
        </form>
      </Form> */}
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ maxWidth: 360 }}
                onFinish={onSubmitLogin}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        }
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
                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                    or <a href="/register">Register now!</a>
                </Form.Item>
            </Form>
        </div>
    )
}
