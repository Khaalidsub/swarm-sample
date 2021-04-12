import { useRouter } from 'next/router'
import { axios } from '../../../util'
import { Post as post, Comment, CommentSearch } from '../../../types'
import Link from 'next/link'
import Navigation from "../../../components/Navigation"
import CommentCard from '../../../components/CommentCard'
import React, { useEffect } from 'react'
import SearchField from '../../../components/SearchField'
import { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants } from "../../../themes/motion";
export interface PostProps {
    post: post
    comments: Comment[]
}
export const Post = ({ post, comments }: PostProps) => {
    const [search, setSearch] = useState('')
    const [filteredComments, setFilteredComments] = useState(comments)
    const [type, setType] = useState(CommentSearch.name)

    const RenderComments = () => {
        return (
            <>
                {filteredComments.map((comment) => {
                    return (
                        <AnimatePresence

                            key={comment.id}>

                            <CommentCard key={comment.id} comment={comment} />
                        </AnimatePresence>
                    )

                })}
            </>
        )
    }
    const filterComments = () =>
        comments.filter((comment) => comment[type].toLowerCase().includes(search.toLowerCase()) ?? comment)




    useEffect(() => {
        setFilteredComments(filterComments)
    }, [search || type])
    return (
        <>
            <Navigation>
                <h4 className="text-center text-xl font-bold capitalize    p-3" >{post.title}</h4>
            </Navigation>
            <div className="max-w-3xl mx-4 md:mx-auto flex flex-col justify-center md:flex-row ">

                <div className="bg-black text-white mx-auto  md:mx-0 md:mr-3 inline-block p-2 text-sm px-5 rounded-md w-2/4 mb-4 shadow md:w-16 md:my-auto  text-center m-2"><Link href="/"> Back </Link></div>
                <SearchField searchValue={search} onSearchHandler={setSearch} onTypeSearchHandler={setType} typeValue={type} />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-3xl mx-4 md:mx-auto p-12 pt-9 border rounded-md mt-3">
                <div className="">
                    <h3 className="text-2xl font-semibold">Comments</h3>

                </div>

                <RenderComments />
            </motion.div>
        </>

    )
}

export const getStaticProps = async (context) => {
    const response = await axios.get<post>(`/posts/${context.params.id}`)
    const { data } = await axios.get<Comment[]>(`/comments?postId=${context.params.id}`)


    return {
        props: {
            post: response.data,
            comments: data
        }
    }
}
export const getStaticPaths = async () => {
    const response = await axios.get<post[]>(`/posts`)
    const ids = response.data.map(post => post.id)
    const paths = ids.map(id => ({ params: { id: id.toString() } }))
    return {
        paths,
        fallback: false,
    }


}

export default Post