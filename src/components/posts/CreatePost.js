import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CreatePost = () => {
    const categoryParam = useParams()
    const [post, updatePost] = useState({
        headline: "",
        text: "",
        categoryId: ""
    })

    const [categories, setCategories] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/categories')
                .then(res => res.json())
                .then((categoriesArray) => {
                    setCategories(categoriesArray)
                })
        },
        []
    )

    const navigate = useNavigate()
    const localKingsUser = localStorage.getItem("kings_user")
    const kingsUserObject = JSON.parse(localKingsUser)

    const handleSubmitButtonClick = (event) => {
        event.preventDefault()

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const centralTime = today.toLocaleString('en-US', {timeZone: 'CST'})

        const postToSendToAPI = {
            headline: post.headline,
            text: post.text,
            categoryId: post.categoryId,
            userId: kingsUserObject.id,
            datetime: centralTime
        }
        if (!postToSendToAPI.headline || !postToSendToAPI.text || !postToSendToAPI.categoryId) {
            window.alert("Please complete post form")
        }
        else {
            return fetch(`http://localhost:8088/posts`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(postToSendToAPI)
            })
                .then(res => res.json())
                .then(() => {
                    navigate(`/`)
                })
        }

    }

    // TODO: make function for (event) => {const copy = { ...post }copy.headline = event.target.value updatePost(copy)} to reuse below

    return (
        <form className="postForm">
            <h2 className="postForm_title">Create New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="headline">Headline:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Please enter a headline"
                        value={post.headline}
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.headline = event.target.value
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="text">Text:</label>
                    <textarea
                        required
                        type="text"
                        className="form-control"
                        id="form-text"
                        placeholder="What's on your mind?"
                        value={post.text}
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.text = event.target.value
                                updatePost(copy)
                            }
                        }
                        > 
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        className="form-control"
                        value={post.categoryId}
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.categoryId = parseInt(event.target.value)
                                updatePost(copy)
                            }
                        }
                    >
                        <option>Select category</option>
                        {categories.map(category => {
                            return <option value={category.id} key={category.id}>{category.category}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent => handleSubmitButtonClick(clickEvent))}
                className="createPost_button">
                Submit Post
            </button>
        </form>
    )
}