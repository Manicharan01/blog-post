import { prismaClient } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod';

const newPostSchema = z.object({
    title: z.string(),
    content: z.string(),
})

export async function POST(request: NextRequest) {
    const { title, content } = await request.json()
    const newPost = newPostSchema.parse({ title, content })
    const session = await getServerSession()
    const user = await prismaClient.user.findUnique({
        where: {
            email: session?.user?.email ?? ""
        }
    })

    try {
        await prismaClient.post.create({
            data: {
                title: newPost.title,
                content: newPost.content,
                userId: user?.id ?? "",
                category: "Technology"
            }
        })

        return NextResponse.json({ success: true })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ success: false })
    }
}
