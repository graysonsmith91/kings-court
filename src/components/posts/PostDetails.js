import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const PostDetails = () => {
    const { postId } = useParams()
    const [post, updatePost] = useState({})

    const localKingsUser = localStorage.getItem("kings_user")
    const kingsUserObject = JSON.parse(localKingsUser)
    const navigate = useNavigate()

    // if post userId matches kingsUserObject id then delete button appear

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${postId}?_expand=category`)
                .then(res => res.json())
                .then((data) => {
                    const singlePost = data
                    updatePost(singlePost)

                })
        },
        [postId]
    )

    const deleteButton = () => {
        if (kingsUserObject.id === post.userId) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/posts/${post.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        navigate("/")
                    })

            }} className="post_delete">Delete</button>
        }
        else {
            return ""
        }
    }

    return <section className="post">
        <div>{post?.category?.category}</div>
        <div className="post-headline">Headline goes here</div>
        <div className="post-text">{post.text}</div>
        {
            deleteButton()
        }
    </section>

}