import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const CreatePost = () => {
    const [post, updatePost] = useState({
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

        const postToSendToAPI = {
            text: post.text,
            categoryId: post.categoryId,
            userId: kingsUserObject.id
        }

        return fetch(`http://localhost:8088/posts`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/")
            })
    }

    return (
        <form className="postForm">
            <h2 className="postForm_title">Create New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="text">Text:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What's on your mind?"
                        value={post.text}
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.text = event.target.value
                                updatePost(copy)
                            }
                        } />
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
                className="btn btn-primary">
                Submit Post
            </button>
        </form>
    )

}

// TODO: make sure text is not empty 