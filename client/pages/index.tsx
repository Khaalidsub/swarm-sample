
import { Post } from "../types"
import { axios, imageApi } from "../util"
import { GetStaticProps } from 'next'
import PostCard from "../components/PostCard"
import Navigation from "../components/Navigation"
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants } from "../themes/motion";
import React from "react"

export interface PostsProps {
  posts: Post[]
}
export const Posts = ({ posts }: PostsProps) => {

  const RenderPosts = () => {
    return <> {posts?.map((post) => {
      return (
        <AnimatePresence key={post.id}>

          <PostCard key={post.id} post={post} />
        </AnimatePresence>

      )
    })
    }

    </>
  }

  return (
    <>

      <Navigation >
        <h4 className="text-center text-2xl antialiased font-semibold" >Posts</h4>
      </Navigation>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"

        className="flex flex-wrap justify-center" >
        <RenderPosts />

      </motion.div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<Post[]>('/posts?_limit=20')
  const imageResponse = await imageApi.get('/list?page=1&limit=20')
  const posts = data.map((post, i) => {


    return { ...post, image: imageResponse.data[i].download_url }
  })
  return {
    props: { posts }
  }
}


export default Posts

