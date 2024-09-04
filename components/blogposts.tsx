"use client";

import { useEffect, useState } from "react";
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Appbar } from "./appbar";

export interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: [];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export default function BlogsView() {
    const [blogPosts, setBlogPosts] = useState<Post[]>([])

    async function getBlogPosts() {
        const res = await fetch(`/api/blog/read/getall`)
        const json = await res.json()
        setBlogPosts(json)
    }

    async function handleDelete(props: any) {
        await fetch(`api/blog/delete`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                title: props.title
            })
        })
    }

    useEffect(() => {
        getBlogPosts()
    }, [])

    console.log(blogPosts)

    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-50">
            <Appbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold mb-6">Blog Dashboard</h1>
                <div className="bg-zinc-800 rounded-lg shadow overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-zinc-700">
                                <TableHead className="text-zinc-300">Title</TableHead>
                                <TableHead className="text-zinc-300">Date</TableHead>
                                <TableHead className="text-zinc-300">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogPosts.map((post) => (
                                <TableRow key={post.id} className="border-b border-zinc-700">
                                    <TableCell className="font-medium">
                                        <Link href={`/blog/${post.id}`} className="text-blue-400 hover:underline">
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-zinc-400">{"2024-09-04"}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button variant="secondary" size="sm" asChild>
                                                <Link href={`/update-blog/${post.id}`}>
                                                    Update
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">Delete</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-zinc-800 text-zinc-50 border border-zinc-700">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription className="text-zinc-400">
                                                            This action cannot be undone. This will permanently delete the blog post.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="bg-zinc-700 text-zinc-50 hover:bg-zinc-600">Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(post.title)} className="bg-red-600 text-zinc-50 hover:bg-red-700">
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
            <footer className="w-full border-t border-zinc-800 mt-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center py-6">
                        <p className="text-xs text-zinc-400">© 2023 Your Blog Name. All rights reserved.</p>
                        <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
                            <Link className="text-xs hover:underline underline-offset-4 text-zinc-400 hover:text-zinc-50" href="#">
                                Terms of Service
                            </Link>
                            <Link className="text-xs hover:underline underline-offset-4 text-zinc-400 hover:text-zinc-50" href="#">
                                Privacy
                            </Link>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}
