import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        username: "",
        picture: "https://www.booksie.com/files/profiles/22/mr-anonymous.png",
        isAdmin: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("kings_user", JSON.stringify({
                        id: createdUser.id,
                        admin: createdUser.isAdmin
                    }))
                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="login_header">Please Register for Kings Court</h1>
                <fieldset>
                    <label htmlFor="username" className="email_header"> Username </label>
                    <input onChange={updateUser}
                           type="text" id="username" className="email_input"
                           placeholder="Enter your username" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email" className="email_header"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="email_input"
                        placeholder="Email address" required />
                </fieldset>
                {/* <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isStaff = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isAdmin" />
                    <label htmlFor="email"> I am an admin </label>
                </fieldset> */}
                <fieldset>
                    <button type="submit" className="login_button"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

