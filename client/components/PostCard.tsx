
import Link from 'next/link'
import { Post } from "../types";
interface PostCardProps {
    post: Post
}
export default function PostCard({ post }: PostCardProps) {


    return (
        <div
            className="hover:border-green-900 shadow-md border border-black rounded max-w-sm m-4 p-4"
        >
            <Link href={{ pathname: `/post/${post.id}`, }}>
                <img className="h-24 cursor-pointer object-cover w-full rounded-lg" src={post.image} />
            </Link>
            <Link href={{ pathname: `/post/${post.id}`, }}>
                <h4
                    className="mt-6 truncate capitalize font-sans font-semibold text-center cursor-pointer hover:underline"
                >
                    {post.title}
                </h4>
            </Link>
            <p
                className="whitespace-normal text-base font-light mt-2 overflow-ellipsis"
            >
                {post.body}
            </p>

        </div>
    )
}
