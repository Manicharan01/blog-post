import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    console.log(id[0])

    try {
        const post = await prismaClient.post.findFirst({
            where: {
                id: id[0]
            }
        })

        return NextResponse.json(post)
    } catch (e) {
        console.log(e)
        return NextResponse.json(e)
    }
}
