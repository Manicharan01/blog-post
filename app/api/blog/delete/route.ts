import { prismaClient } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod'

const titleSchema = z.object({
    title: z.string()
})

export async function DELETE(req: NextRequest) {
    const { title } = await req.json()
    console.log(title)
    const parsedInput = await titleSchema.parseAsync({ title })
    const session = await getServerSession()

    const user = await prismaClient.user.findUnique({
        where: {
            email: session?.user?.email ?? ""
        },
        select: {
            id: true
        }
    })

    try {
        await prismaClient.post.delete({
            where: {
                userId_title: {
                    title: parsedInput.title,
                    userId: user?.id ?? ""
                }
            }
        })

        return NextResponse.json({ message: "Deleted Sucessfully" })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: "Invalid Request" })
    }
}
