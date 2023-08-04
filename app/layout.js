import Navbar from './components/navbar';
import './globals.css'
import {Poppins} from 'next/font/google'
import { ReduxProvider } from './redux/provider';

const poppins=Poppins({
  weight:['400','700'],
  subsets:['latin']
});

export const metadata = {
  title: 'ThreadScape',
  description: 'Ecommerce',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className} >
        <ReduxProvider>
        <Navbar/>
        <main>{children}</main>
        </ReduxProvider>
        </body>
    </html>
  )
}
