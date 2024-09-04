import { prismaClient } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod'

const titleSchema = z.object({
    title: z.string(),
    updatedTitle: z.string(),
    content: z.string(),
})

export async function PUT(req: NextRequest) {
    const session = await getServerSession()
    const parsedInput = await titleSchema.parseAsync(req.json())

    const existingUser = await prismaClient.user.findUnique({
        where: {
            email: session?.user?.email ?? "",
        },
        select: {
            id: true
        }
    })

    try {
        await prismaClient.post.update({
            where: {
                userId_title: {
                    title: parsedInput.title,
                    userId: existingUser?.id ?? "",
                }
            },
            data: {
                title: parsedInput.updatedTitle,
                content: parsedInput.content,
                updatedAt: String(Date.now())

            }
        })

        return NextResponse.json({ message: "Updated Successfully" })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: "Invalid Request" })
    }
}
