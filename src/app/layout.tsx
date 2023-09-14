'use client'

import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import './globals.css'
import 'react-custom-alert/dist/index.css'
import { ToastContainer } from 'react-custom-alert'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer floatingTime={1000} />

        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
