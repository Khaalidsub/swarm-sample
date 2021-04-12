import { Comment } from '../types'
export interface CommentCardProps {
    comment: Comment
}
export default function CommentCard({ comment }: CommentCardProps) {
    return (
        <div className="rounded-lg shadow-md p-4 pt-5 my-6 flex flex-col">
            <div className="flex flex-row ">
                <p className="text-lg font-semibold capitalize md:mr-4">
                    {comment.name}
                </p>
                <p className="text-sm font-extralight">
                    {comment.email}
                </p>
            </div>
            <p className="text-base mt-4 font-light">{comment.body}</p>

        </div>
    )
}
