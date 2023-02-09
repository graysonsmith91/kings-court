import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const EditProfile = () => {
    const [profile, updateProfile] = useState({
        aboutMe: "",
        picture: "",
        location: ""
    })

    const navigate = useNavigate()

    const localKingsUser = localStorage.getItem("kings_user")
    const kingsUserObject = JSON.parse(localKingsUser)


    useEffect(() => {
        fetch(`http://localhost:8088/users/${kingsUserObject.id}`)
            .then(res => res.json())
            .then((data) => {
                updateProfile(data)
            })

    }, [])


    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
            return fetch(`http://localhost:8088/users/${profile.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(profile)
            })
                .then(res => res.json())
                .then(() => {
                    navigate(`/profile/${kingsUserObject.id}`)
                })

    }
    

    // TODO: Refactor onchanges below
    return (
        <form className="profileForm">
            <h2 className="profileForm_title">Edit Your Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="aboutMe">About me:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Tell us about yourself"
                        value={profile.aboutMe || ''}
                        onChange={
                            (event) => {
                                const copy = { ...profile }
                                copy.aboutMe = event.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="picture">Picture:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter picture URL here"
                        value={profile.picture || ''}
                        onChange={
                            (event) => {
                                const copy = { ...profile }
                                copy.picture = event.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Where are you from?"
                        value={profile.location || ''}
                        onChange={
                            (event) => {
                                const copy = { ...profile }
                                copy.location = event.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent => handleSaveButtonClick(clickEvent))}
                className="button-saveProfile">
                Save Profile
            </button>
        </form>
    )

}