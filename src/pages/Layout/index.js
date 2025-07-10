import { Outlet } from "react-router-dom"
import { Button } from "antd-mobile"

function Layout(){
    return(
        <div>
            <Outlet/>
            <h1>Layout</h1>
            <p>Layout</p>
            <Button color="primary">Primary Button</Button>
        </div>
    )
}

export default Layout