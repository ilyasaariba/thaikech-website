import { Cinzel, Outfit } from 'next/font/google'

export const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
})

export const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})
