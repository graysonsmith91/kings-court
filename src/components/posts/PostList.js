import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./Posts.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts`)
                .then(res => res.json())
                .then((postsArray) => {
                    setPosts(postsArray)
                })
        },
        []
    )

    return <>
        <h2>Posts</h2>

        <div className="posts">
            {
                posts.map(
                    (post) => {
                        return <div className="post">
                            {post.text}
                        </div>
                    }
                )
            }

        </div>
    </>
}