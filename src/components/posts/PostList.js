import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./Posts.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts?_expand=category&_expand=user`)
                .then(res => res.json())
                .then((postsArray) => {
                    setPosts(postsArray)
                })
        },
        []
    )

    return <>
        
        <div className="createPostDiv">
            <button className="createPost_button" onClick={(clickEvent) => navigate("/create")}>Create a Post</button>
        </div>

        <div className="posts">
            {
                posts.map(
                    (post) => {
                        return <>
                            <div className="post" onClick={() => navigate(`/post/${post.id}`)} key={post.id}>
                                <div className="category">{post.category.category}</div>
                                <div className="post_headline">{post.headline}</div>
                                <div>{post.user.username}</div>

                            </div>
                        </>
                    }
                )

            }

        </div>
    </>
}