import { type Post } from "../types/posts"
import PostCard from "./post-card"


export function PostList ({ posts } : { posts: Post[] | null }) {
    return (
        <>
         {
          posts?.map(post => {
            const {
              id,
              user,
              content
            } = post

            const {
              user_name: userName,
              name: userFullName,
              avatar_url: avatarUrl,
            } = user

            return (
              <PostCard 
                avatarUrl={avatarUrl}
                content= {content}
                key={id}
                userFullName={userFullName}
                userName={userName}
              />
            )
          })
        }
        </>
    )
}