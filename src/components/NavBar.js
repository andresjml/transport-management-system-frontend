import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/orders">Orders</Link> |
                <Link to="/transport_companies">Transport Companies</Link> |
                <Link to="/vehicles">Vehicles</Link> |
                <Link to="/trips">Trips</Link> |
            </nav>            
        </>
    )
}

export default NavBar
