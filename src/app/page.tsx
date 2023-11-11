import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AuthButtonServer } from "@/app/components/auth-button-server"
import { PostList } from "./components/posts-list"


export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: {session}} = await supabase.auth.getSession()
  const { data: posts } = await supabase.from('posts').select('*, user:users(name, user_name, avatar_url)')

  if (session === null) {
    redirect('/login')
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
    
      <section className="max-w-[600px] mx-auto min-h-screen border-l border-r border-white/30">
        <AuthButtonServer />
        <PostList posts={posts}/>
      </section>
     
    </main>
  )
}
