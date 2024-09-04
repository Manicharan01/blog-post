"use client";

import { Appbar } from '@/components/appbar';
import BlogsView from '@/components/blogposts';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function Component() {
    const session = useSession()
    const router = useRouter()

    try {
        if (!session?.data?.user?.email) {
            return (
                router.push('/')
            )
        }

        return (
            <div>
                <BlogsView />
            </div>
        )
    } catch (e) {
        console.log(e)
        return null
    }
}
