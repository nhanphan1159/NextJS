import Profile from '@/app/me/profile'
import envConfig from '@/config'
import { cookies } from 'next/headers'

export default async function MeProfile() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')
    const result = await fetch('http://localhost:4000/account/me', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken?.value}`,
            // 'cookie': `sessionToken = ${sessionToken}`
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
    return (
        <div className='p-[100px]'>
            <h1>Profile</h1>
            <div>Xin chào {result.payload.data.name}</div>
            <Profile />
        </div>
    )
}
