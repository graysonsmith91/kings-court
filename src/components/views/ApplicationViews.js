import { FanViews } from "./FanViews"

export const ApplicationViews = () => {

    const localKingsUser = localStorage.getItem("kings_user")
    const kingsUserObject = JSON.parse(localKingsUser)

    if (kingsUserObject.isAdmin) {
        return <FanViews />
    } else {
        return <FanViews />
    }
}