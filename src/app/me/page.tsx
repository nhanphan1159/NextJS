import envConfig from '@/config'
import { cookies } from 'next/headers'

export default async function MeProfile() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')
    //   const result = await fetch(
    //     'http://localhost:4000/account/me',
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${sessionToken?.value}`
    //       }
    //     }
    //   ).then(async (res) => {
    //     const payload = await res.json()
    //     const data = {
    //       status: res.status,
    //       payload
    //     }
    //     if (!res.ok) {
    //       throw data
    //     }
    //     return data
    //   })
    const result = await fetch('http://localhost:4000/account/me', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken?.value}`,
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
        <div>
            <div className="container pt-[100px]">
                <h1>{result.payload.data.name}</h1>
                <p>{result.payload.data.email}</p>
            </div>
        </div>
    )
}
