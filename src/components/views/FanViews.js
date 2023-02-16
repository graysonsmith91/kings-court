import { Outlet, Route, Routes } from "react-router-dom"
import { CreatePost } from "../posts/CreatePost"
import { CategoriesList } from "../posts/PostCategories"
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
                        <h1 className="kings_header">👑 Kings Court 👑</h1>
                        <div className="kings_header_caption">Your favorite Kings community since 2023</div>
                        <ol className="kings_header_caption">Rules:
                            <li className="kings_header_rules">1. No Lakers Fans</li>
                            <li className="kings_header_rules">2. Be respectful, this is a loving community</li>
                            <li className="kings_header_rules">3. Post in the correct forum</li>
                        </ol>
                    </div>

                    <Outlet />
                </>
            }>
                <Route path="/" element={< CategoriesList/>} />
                <Route path=":category" element={<PostList />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="post/:postId" element={<PostDetails />} />
                <Route path="profile/:profileId" element={<Profile />} />
                <Route path="profile/:profileId/edit" element={<EditProfile />} />
            </Route>
        </Routes>
    )
}