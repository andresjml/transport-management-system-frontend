import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/orders">Orders</Link> |
                <Link to="/transport_companies">Home</Link> |
                <Link to="/vehicles">Home</Link> |
                <Link to="/trips">Home</Link> |
            </nav>            
        </>
    )
}

export default NavBar
