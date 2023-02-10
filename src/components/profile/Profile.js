import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Profile.css"

export const Profile = () => {
    const { profileId } = useParams()
    const [user, updateUserInfo] = useState([])

    const navigate = useNavigate()
    const localKingsUser = localStorage.getItem("kings_user")
    const kingsUserObject = JSON.parse(localKingsUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${profileId}`)
                .then(res => res.json())
                .then((data) => {
                    const singleUser = data
                    updateUserInfo(singleUser)
                })
        },
        [profileId]
    )

    const EditProfileButton = () => {
        if (kingsUserObject.id === user.id) {
            return <button className="editProfile-button" onClick={(clickEvent) => navigate(`/profile/${user.id}/edit`)}>Edit my Profile</button>
        } else {
            return ""
        }
    }

    return <>
    
    <section className="profile">
        <img src={user.picture} alt="" width="150" height="200" />
        <div className="post_headline">{user.username}</div>
        <div>Email: {user.email}</div>
        <div>About me: {user.aboutMe}</div>
        <div>Location: {user.location}</div>
        {EditProfileButton()}
    </section>
    </>
}