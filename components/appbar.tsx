"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation";

export function Appbar() {
    const session = useSession();
    const router = useRouter()

    return (
        <div className="flex justify-between p-8" >
            <div className="ml-2 text-lg font-bold flex justify-center items-center">
                <span className="h-8 w-8 text-2xl">📝</span>
                <span>MineBlog</span>
            </div>
            <div>
                {session.data?.user && (
                    <div className="flex justify-center items-center">
                        <Button
                            variant="outline"
                            className="text-black m-4"
                            onClick={() => {
                                router.push("/newpost")
                            }}
                        >Add New Post</Button>
                        <Button
                            variant="outline"
                            className="text-black"
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Log Out
                        </Button>
                    </div>
                )}
                {!session.data?.user && (
                    <Button
                        variant="outline"
                        className="text-black"
                        onClick={() => {
                            signIn();
                        }}
                    >
                        Sign In
                    </Button>
                )}
            </div>
        </div >
    );
}
