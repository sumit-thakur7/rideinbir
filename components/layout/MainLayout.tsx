'use client'

import Navbar from './Navbar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
     
    </>
  )
}
