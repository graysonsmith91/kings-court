import { Outlet, Route, Routes } from "react-router-dom"
import { CreatePost } from "../posts/CreatePost"
import { PostDetails } from "../posts/PostDetails"
import { PostList } from "../posts/PostList"
import { Profile } from "../profile/Profile"
import { EditProfile } from "../profile/ProfileEdit"
import "./Views.css"

export const FanViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <div className="mainpage_header">
                        <h1 className="kings_header">Kings Court</h1>
                        <div className="kings_header">Your favorite Kings community since 2023</div>
                    </div>

                    <Outlet />
                </>
            }>
                <Route path="/" element={<PostList />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="post/:postId" element={<PostDetails />} />
                <Route path="profile/:profileId" element={<Profile />} />
                <Route path="profile/:profileId/edit" element={<EditProfile />} />
            </Route>
        </Routes>
    )
}