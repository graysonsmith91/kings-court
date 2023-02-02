import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./Posts.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts?_expand=category`)
                .then(res => res.json())
                .then((postsArray) => {
                    setPosts(postsArray)
                })
        },
        []
    )

    return <>
        <h2>Posts</h2>
        <div className="createPostDiv">
            <button className="createPost-button" onClick={(clickEvent) => navigate("/create")}>Create a Post</button>
        </div>

        <div className="posts">
            {
                posts.map(
                    (post) => {
                        return <>
                            <div className="post" onClick={() => navigate(`/post/${post.id}`)} key={post.id}>
                                <div className="category">
                                    {post.category.category}
                                </div>
                                {post.text}

                            </div>
                        </>
                    }
                )

            }

        </div>
    </>
}

// TODO: Can change this map to the PostDetails function and use props from it I think