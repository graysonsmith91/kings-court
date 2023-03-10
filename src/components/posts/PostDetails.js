import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Pagination } from "./Pagination"

export const PostDetails = () => {
    const { postId } = useParams()
    const [post, updatePost] = useState({})
    const [filteredComments, SetFilteredComments] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [commentsPerPage] = useState(10)
    const [comment, updateComment] = useState({})

    const localKingsUser = localStorage.getItem("kings_user")
    const kingsUserObject = JSON.parse(localKingsUser)
    const navigate = useNavigate()
    const highestPage = Math.ceil(filteredComments.length / commentsPerPage)

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${postId}?_expand=category&_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    const singlePost = data
                    updatePost(singlePost)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/comments?_expand=user`)
                .then(res => res.json())
                .then((allCommentsArray) => {
                    const filteredComments = allCommentsArray.filter((comment) => comment.postId === parseInt(postId))
                    SetFilteredComments(filteredComments)
                })
        },
        [postId]
    )


    const refetchComments = () => {
        fetch(`http://localhost:8088/comments?_expand=user`)
            .then(res => res.json())
            .then((allCommentsArray) => {
                const filteredComments = allCommentsArray.filter((comment) => comment.postId === parseInt(postId))
                SetFilteredComments(filteredComments)
            })
    }

    const indexOfLastComment = currentPage * commentsPerPage
    const indexOfFirstComment = indexOfLastComment - commentsPerPage
    const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    const displayAllComments = () => {

        return (
            <div className="comments_section">
                {currentComments.map((comment) =>

                        <section className="post_expanded" key={comment.id}>
                            <div className="profile_card" onClick={() => navigate(`/profile/${comment.userId}`)}>
                                <img src={comment?.user?.picture} alt="" width="75" height="100" />
                                <div className="post-username">{comment?.user?.username}</div>
                            </div>

                            <div className="post_details">
                                <div className="post-datetime">{comment.datetime}</div>
                                <div className="post-text">{comment.comment}</div>
                                <div className="deletePost_button">{deleteButtonForComment(comment)}</div>
                            </div>
                        </section>

                )}
            </div>
        )
    }


    const deleteButtonForComment = (comment) => {

        const deletedCommentObject = {
            comment: "This comment has been removed.",
            postId: comment.postId,
            userId: comment.userId,
            datetime: comment.datetime
        }

        if (comment.comment === "This comment has been removed.") {
            return ""
        }
        else if (kingsUserObject.id === comment.userId || kingsUserObject.admin) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/comments/${comment.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(deletedCommentObject)
                })
                    .then(res => res.json())
                    .then(() => {
                        refetchComments()
                        navigate(`/post/${postId}`)
                    })

            }} className="post_delete">Delete</button>
        }
        else {
            return ""
        }
    }


    const handlePostCommentButtonClick = (event) => {
        event.preventDefault()

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const centralTime = today.toLocaleString('en-US', { timeZone: 'CST' })

        const commentToSendToAPI = {
            comment: comment.comment,
            postId: parseInt(postId),
            userId: kingsUserObject.id,
            datetime: centralTime
        }

        if (!commentToSendToAPI.comment) {
            window.alert("Please add a comment")
        }
        else {
            return fetch(`http://localhost:8088/comments`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(commentToSendToAPI)
            })
                .then(res => res.json())
                .then(() => {
                    refetchComments()
                    document.querySelector('textarea').value = ''
                    updateComment('')
                })
                .then(() => {
                    if (filteredComments.length % 10 === 0 && filteredComments.length > 0) {
                        setCurrentPage(currentPage + 1)
                        window.scrollTo(0, 0)
                    }
                })
        }
    }


    return <>
        <div className="post-headline">
            <h1 className="post_details_headline">{post.headline}</h1>
        </div>

        {
            filteredComments.length > 10 ?
                <Pagination
                    commentsPerPage={commentsPerPage}
                    totalComments={filteredComments.length}
                    paginate={paginate}
                    currentPage={currentPage} />
                : ""
        }

        {
            currentPage === 1 ?
                <section className="post_expanded" key={post.id}>

                    <div className="profile_card" onClick={() => navigate(`/profile/${post.userId}`)}>
                        <img src={post?.user?.picture} alt="" width="75" height="100" />
                        <div className="post-username">{post?.user?.username}</div>
                    </div>

                    <div className="post_details">
                        <div className="post-datetime">{post.datetime}</div>

                        <div className="post-text">{post.text}</div>
                    </div>

                </section>
                : ""
        }

        {displayAllComments()}

        {
            currentPage === highestPage || filteredComments.length === 0 ?
            <fieldset>
                <div className="addComment_textForm">
                    <label htmlFor="text">Add comment here:</label>
                    <textarea
                        required
                        type="text"
                        className="form-control"
                        id="commentForm-text"
                        placeholder="What's on your mind?"
                        value={post.comments?.comment}
                        onChange={
                            (event) => {
                                const copy = { ...comment }
                                copy.comment = event.target.value
                                updateComment(copy)
                            }
                        }
                    >
                    </textarea>
                    <button className="addComment-btn" onClick={(clickEvent => handlePostCommentButtonClick(clickEvent))}>Post comment</button>
                </div>
            </fieldset>
            : ""
        }

    </>

}
