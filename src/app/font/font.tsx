import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'

export const fontSuavity = localFont({
    src: './TheSuavity.otf',
    display: 'swap',
})

export const roboto = Roboto({
    subsets: ['cyrillic'],
    weight: ['100', '300', '400', '500', '700', '900'],
})
