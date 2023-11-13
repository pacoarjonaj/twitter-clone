'use client'

import { addPost } from '../actions/add-post-action'
import { ComposePostButton } from './compose-post-button'
import { useRef } from 'react'


export function ComposePost ({
    userAvatarUrl
} : {
    userAvatarUrl: string
}) {
    const fromRef = useRef<HTMLFormElement>(null)

    return (
        <form ref={fromRef} action={async (formData) => {
            await addPost(formData)
            fromRef.current?.reset()
        }} className='flex flex-row p-3 border-b border-white/20'>
            <img className='rounded-full w-10 h-10 object-contain mr-4' src={userAvatarUrl} />
            <div className='flex flex-1 flex-col gap-y-4'>
                <textarea
                    name='content'
                    rows={4}
                    className='w-full text-xl bg-black placeholder-gray-500 p-2'
                    placeholder='¡¿Qué está pasando?!'
                ></textarea>
                <ComposePostButton />
                </div>
        </form>
    )
}