import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../posts/PostList"

export const FanViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kings' Court</h1>
                    <div>Your favorite Kings community since 2023</div>

                    <Outlet />
                </>
            }>
                <Route path="/" element={<PostList />} />
            </Route>
        </Routes>
    )
}