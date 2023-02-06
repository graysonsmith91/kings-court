import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const PostDetails = () => {
    const { postId } = useParams()
    const [post, updatePost] = useState({})

    const localKingsUser = localStorage.getItem("kings_user")
    const kingsUserObject = JSON.parse(localKingsUser)
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${postId}?_expand=category&_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    const singlePost = data
                    updatePost(singlePost)

                })
        },
        [postId]
    )

    const deleteButton = () => {
        if (kingsUserObject.id === post.userId || kingsUserObject.admin) {
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

    return <>
        <section className="post_expanded">

            <div className="profile_card">
                <img src={post?.user?.picture} alt="" width="75" height="100" />
                <div className="post-username">{post?.user?.username}</div>
            </div>

            <div className="post_details">
                <div className="category">{post?.category?.category}</div>
                <div>{post.datetime}</div>
                <div className="post-headline">{post.headline}</div>
                <div className="post-text">{post.text}</div>
                <div className="deletePost_button">{deleteButton()}</div>
            </div>
        </section>
    </>

}

// TODO: can reuse html as a function that is called when PUT is done for comments
// same info
// handleAddCommentButton click event that does the PUT to the posts and adds array somehow?