import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "./Posts.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [sortedPosts, setSortedPosts] = useState([])
    const navigate = useNavigate()
    const { category } = useParams()

    const localKingsUser = localStorage.getItem("kings_user")
    const kingsUserObject = JSON.parse(localKingsUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts?_expand=category&_expand=user`)
                .then(res => res.json())
                .then((postsArray) => {
                    const postsFilteredByCategory = postsArray.filter((post) => post.category.category === category)
                    setPosts(postsFilteredByCategory)
                })
        },
        []
    )

    useEffect(
        () => {
            const copyPosts = [...posts]
            copyPosts.sort((a, b) => {
                return b.id - a.id
            })
            setSortedPosts(copyPosts)
        },
        [posts]
    )

    const deleteButtonForPost = (post) => {
        if (kingsUserObject.admin) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/posts/${post.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        navigate("/")
                    })

            }} className="deletePost_button">Delete Post</button>
        }
        else {
            return ""
        }
    }


    return <>
        
        <div className="createPostDiv">
            <button className="createPost_button" onClick={(clickEvent) => navigate("/create")}>Create a Post</button>
        </div>

        <div className="category_header">{category} ({posts.length} posts total)</div>

        <div className="posts">
            {
                sortedPosts.map(
                    (post) => {
                        return <>
                            <div className="post" onClick={() => navigate(`/post/${post.id}`)} key={post.id}>
                                
                                <div className="post_headline">{post.headline}</div>
                                <div className="post_username">{post.user.username}</div>
                                <div>{post.datetime}</div>
                                <div>{deleteButtonForPost(post)}</div>
                            </div>
                        </>
                    }
                )
            }

        </div>
    </>
}