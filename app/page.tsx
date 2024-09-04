import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Redirect } from '@/components/redirect'
import { Appbar } from '@/components/appbar'

export default function CenteredDarkThemeBlogLandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-900 text-zinc-50">
            <Appbar />
            <Redirect />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Welcome to Our Blog
                                </h1>
                                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
                                    Discover insightful articles, expert opinions, and the latest trends in our carefully curated blog posts.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button variant="secondary">Latest Posts</Button>
                                <Button className='text-black' variant="outline">Subscribe</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Featured Posts</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="bg-zinc-900 border-zinc-800">
                                    <CardHeader>
                                        <CardTitle className="text-zinc-50">Blog Post Title {i}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-zinc-400">This is a brief preview of blog post {i}. Click to read more...</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="link" className="text-zinc-400 hover:text-zinc-50">Read More</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Subscribe to Our Newsletter
                                </h2>
                                <p className="mx-auto max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Stay updated with our latest posts and insights. Join our growing community!
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <form className="flex space-x-2">
                                    <Input
                                        className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                    <Button type="submit" variant="secondary">Subscribe</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full border-t border-zinc-800">
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
