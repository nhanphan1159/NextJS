import { fontSuavity } from '@/app/font/font'
import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'
export default function Header() {
    return (
        <div className="flex h-[84px] w-full justify-between px-4 text-[40px] items-center border-b-[1px] border-[#000] fixed top-0 flex-row">
            <div className={fontSuavity.className}>
                <Link href="/"> Emily</Link>
            </div>
            <div className="flex flex-row  absolute top-0 right-0 z-50 text-[24px] font-thin h-full justify-center items-center">
                <ul className="flex flex-row gap-1 pr-3">
                    <li>
                        <Link href="/login">Log in</Link>
                    </li>
                    <li>
                        <Link href="/register">Register</Link>
                    </li>
                    <li>
                        <Link href="/">Log out</Link>
                    </li>
                    <ModeToggle />
                </ul>
            </div>
        </div>
    )
}
