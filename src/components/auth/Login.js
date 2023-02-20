import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("gsmith@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("kings_user", JSON.stringify({
                        id: user.id,
                        admin: user.isAdmin
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    
                    <h2 className="login_header">Please sign in</h2>
                    <fieldset>
                        <label className="email_header" htmlFor="inputEmail"> Email </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="email_input"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="login_button">
                            Sign In
                        </button>
                    </fieldset>
                <section className="link--register">
                    <Link to="/register" className="register--link">Not a member yet?</Link>
                </section>
                </form>
            </section>
        </main>
    )
}

