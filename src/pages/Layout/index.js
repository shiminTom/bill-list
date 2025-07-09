import { Outlet } from "react-router-dom"

function Layout(){
    return(
        <div>
            <Outlet/>
            <h1>Layout</h1>
            <p>Layout</p>
        </div>
    )
}

export default Layout