"use client";

import { signIn } from 'next-auth/react';
import React from 'react';
import type { SVGProps } from 'react';

const errorMessages = {
    "OAuthAccountNotLinked": "Lütfen daha önce giriş yaptığınız hesabınızla giriş yapın."
}

export default function SignIn({ searchParams }: { searchParams: { [x: string]: string } }) {
    return (
        <main className="flex-1 grid place-items-center">
            <div className="border-2 rounded-lg p-5">
                <div className=" text-center pb-5 text-2xl flex flex-col">
                    <div className="font-semibold pb-5">
                        Giriş Yap
                    </div>
                    {searchParams.error && (
                        <div className="bg-red-500 rounded-lg text-white p-3 text-xl">
                            {errorMessages[searchParams.error as keyof typeof errorMessages]}
                        </div>
                    )}
                </div>
                <div className="flex justify-center *:border-2 *:rounded-lg *:aspect-square *:grid *:place-items-center *:p-2 gap-4 *:cursor-pointer">
                    <div onClick={() => signIn("google", {
                        callbackUrl: "/"
                    })}>
                        <GoogleIcon className="size-12" />
                    </div>
                    <div onClick={() => signIn("github", {
                        callbackUrl: "/"
                    })}>
                        <GithubIcon className="size-12 text-[] dark:text-white" />
                    </div>
                    <div onClick={() => signIn("discord", {
                        callbackUrl: "/"
                    })}>
                        <DiscordIcon className="size-12" />
                    </div>
                </div>
            </div>
        </main>
    );
}

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 48 48" {...props}><path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"></path><path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"></path><path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"></path><path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"></path></svg>);
}

function DiscordIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1.29rem" height="1rem" viewBox="0 0 256 199" {...props}><path fill="#5865f2" d="M216.856 16.597A208.5 208.5 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046q-29.538-4.442-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.8 207.8 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161 161 0 0 0 79.735 175.3a136.4 136.4 0 0 1-21.846-10.632a109 109 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a132 132 0 0 0 5.355 4.237a136 136 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848c21.142-6.58 42.646-16.637 64.815-33.213c5.316-56.288-9.08-105.09-38.056-148.36M85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2s23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18m85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2c0 14.375-10.148 26.18-23.015 26.18"></path></svg>);
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 0 1 1.025-2.688a3.594 3.594 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 0 1 .1 2.65a3.869 3.869 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.562 4.937a2.368 2.368 0 0 1 .674 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247"></path></svg>);
}