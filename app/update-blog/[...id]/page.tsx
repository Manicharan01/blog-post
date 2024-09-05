"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from 'react'
import { Post } from '@/components/blogposts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { postState } from "@/store/atoms/post";
import { postSelector } from "@/store/selectors/post";

export default function Component() {
    const { id } = useParams()
    const [requiredPost, setRequiredPost] = useRecoilState<Post>(postState)

    async function getPost() {
        await fetch(`http://localhost:3000/api/blog/read/${id}/`, {
            method: 'GET',
        }).then((res) => {
            res.json().then(data => setRequiredPost(data))
        })
    }

    useEffect(() => {
        getPost();
    }, [])

    console.log(requiredPost)

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <UpdateCard />
        </div>
    )
}

export function UpdateCard() {
    const post = useRecoilValue(postSelector)
    const title = post.title
    const [updatedTitle, setUpdatedTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    console.log(title, content)

    return (
        <Card className="flex flex-col justify-center items-center">
            <CardHeader>
                <CardTitle>Update Post</CardTitle>
                <CardDescription>Change either Title or Content</CardDescription>
            </CardHeader>
            <CardContent>
                <Input
                    className="mb-4"
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => {
                        setUpdatedTitle(e.target.value)
                    }}
                    placeholder="Title"
                ></Input>
                <Input
                    type="text"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    placeholder="Content"
                ></Input>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={async () => {
                        await fetch(`http://localhost:3000/api/blog/update`, {
                            method: 'PUT',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                title: title,
                                content: content,
                                updatedTitle: updatedTitle
                            })
                        }).then(res => {
                            res.json().then(data => {
                                console.log(data)
                            })
                        })
                    }}
                >Update</Button>
            </CardFooter>
        </Card>
    )

}
