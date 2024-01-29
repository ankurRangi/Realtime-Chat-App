//Creating a layout which will be used by all the pages
import { Icons } from '@/components/icons'
import { authOptions } from '@/lib/auth'
import { Link } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = async ({ children }: LayoutProps) => {
  //Getting Session
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  return (
    <div className="w-full flex h-screen">
      <div className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <Link
          href="/dashboard"
          className="flex h-16 shirnk-0 items-center"
        ><Icons.Logo className='h-8 w-auto text-indigo-600'></Icons.Logo>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default Layout
