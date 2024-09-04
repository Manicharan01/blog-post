import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession()

    const user = await prismaClient.user.findUnique({
        where: {
            email: session?.user?.email ?? ""
        }
    })

    try {
        const requestedPost = await prismaClient.post.findMany({
            where: {
                userId: user?.id ?? ""
            }
        })

        return NextResponse.json(requestedPost)
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: "Bad Request" })
    }
}

