'use client'

import { z } from 'zod'

import LoginForm from '@/app/(auth)/login/login-form'
import envConfig from '@/config'

const formSchema = z.object({
    username: z.string().min(2).max(50),
})

type formValues = z.infer<typeof formSchema>

export default function LoginPage() {


    return (
        <div className="w-full h-full flex justify-center items-center pt-24">
            <LoginForm />
        </div>
    )
}
