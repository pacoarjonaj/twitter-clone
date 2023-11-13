import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AuthButtonServer } from "@/app/components/auth-button-server"
import { PostList } from "./components/posts-list"
import { type Database } from "./types/database"
import { ComposePost } from "./components/compose-post"


export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: {session}} = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(name, user_name, avatar_url)')
    .order('created_at', { ascending: false })


  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
    
      <section className="max-w-[800px] w-full mx-auto min-h-screen border-l border-r border-white/30">
        <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url}/>
        <PostList posts={posts}/>
      </section>
     <AuthButtonServer />
    </main>
  )
}
