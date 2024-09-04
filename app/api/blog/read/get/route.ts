import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const titleSchema = z.object({
    title: z.string(),
})

export async function GET(req: NextRequest) {
    const parsedTitle = await titleSchema.parseAsync(req.json())
    const session = await getServerSession()

    const user = await prismaClient.user.findUnique({
        where: {
            email: session?.user?.email ?? ""
        }
    })

    try {
        const requestedPost = await prismaClient.post.findUnique({
            where: {
                userId_title: {
                    title: parsedTitle.title,
                    userId: user?.id ?? ""
                }
            },
            select: {
                id: true,
                title: true,
                content: true,
                category: true,
                tags: true,
                createdAt: true,
                updatedAt: true,
                userId: true
            }
        })

        return NextResponse.json(requestedPost)
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: "Bad Request" })
    }
}
