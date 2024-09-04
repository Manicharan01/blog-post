"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Component() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter()

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Card className="flex flex-col justify-center items-center">
                <CardHeader>
                    <CardTitle>New Post</CardTitle>
                    <CardDescription>Add title and file location of the Contents</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        placeholder="Title"
                    ></Input>
                    <br />
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
                            await fetch(`/api/blog/create`, {
                                method: "POST",
                                headers: {
                                    "content-type": "application/json",
                                },
                                body: JSON.stringify({
                                    title,
                                    content
                                })
                            }).then(res => {
                                res.json().then(data => {
                                    alert(data.message)
                                    router.push('/dashboard')
                                })
                            })
                        }}
                    >Create Post</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
