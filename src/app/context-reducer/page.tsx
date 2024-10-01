'use client'
import { PostsProvider } from "@/contexts/usePost"
import App from "./app"

const ContextReducerPage = () => {
    return (
        <PostsProvider>
            <App />
        </PostsProvider>
    )
}

export default ContextReducerPage