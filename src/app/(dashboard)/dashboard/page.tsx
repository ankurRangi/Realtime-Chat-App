import Button from "@/components/ui/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

interface LayoutProps {
    children: ReactNode
}

const page = async ({children}: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    return <div className="w-full flex h-screen">
    <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-grey-200 bg-white px-6"></div>
    <Link href={'/dashboard'} className="flex h-16  shrink-0 items-center"></Link>
    {children}</div>
}

export default page;