import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Profile.css"

export const Profile = () => {
    const { profileId } = useParams()
    const [user, updateUserInfo] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${profileId}`)
                .then(res => res.json())
                .then((data) => {
                    const singleUser = data
                    updateUserInfo(singleUser)
                })
        },
        []
    )

    return <>
    
    <section className="profile">
        <img src={user.picture} alt="" width="150" height="200" />
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>About me: {user.aboutMe}</div>
        <div>Location: {user.location}</div>
        <button className="editProfile-button" onClick={(clickEvent) => navigate(`/profile/${user.id}/edit`)}>Edit my Profile</button>

    </section>
    </>
}