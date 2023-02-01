import { UserNav } from "./UserNav"
import { AdminNav } from "./AdminNav"
import "./NavBar.css"


export const NavBar = () => {
    
    const localKingsUser = localStorage.getItem("kings_user")
    const kingsUserObject = JSON.parse(localKingsUser)

    if (kingsUserObject.admin) {
        return <UserNav />
    } else {
        return <AdminNav />
    }
}