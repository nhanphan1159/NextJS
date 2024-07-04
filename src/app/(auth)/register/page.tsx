'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import RegisterForm from '@/app/(auth)/register/register-form'

const formSchema = z.object({
    username: z.string().min(2).max(50),
})

type formValues = z.infer<typeof formSchema>

export default function LoginPage() {
    return (
        <div className="w-full h-full flex justify-center items-center pt-24">
            <RegisterForm />
        </div>
    )
}
