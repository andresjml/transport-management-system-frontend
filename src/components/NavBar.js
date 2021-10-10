import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <div className="pb-5">
            <nav className="navbar navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Offcanvas navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/orders" className="nav-link active" aria-current="page">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/transport_companies" className="nav-link active" aria-current="page">Transport Companies</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/vehicles" className="nav-link active" aria-current="page">Vehicles</Link>
                            </li> 
                            <li className="nav-item">
                                <Link to="/trips" className="nav-link active" aria-current="page">Trips</Link>
                            </li>          
                        </ul>                        
                    </div>
                    </div>
                </div>
            </nav>                       
        </div>
    )
}

export default NavBar
