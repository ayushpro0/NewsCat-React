import React from "react";
import {Link} from "react-router-dom";

const NavBar = () => {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg" style={{backgroundColor: '#333456'}}>
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/" style={{color: 'white'}}><b>NewsCat</b></Link>

                        {/* //navigation bar collapses into an icon to show in smaller device  */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" style={{color: 'white'}}></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{color: 'white'}}>
                                <li className="nav-item"> <Link className="nav-link" aria-current="page" to="/" style={{color: 'white'}}><>Home</></Link></li>

                                {/* categories for news */}
                                <li className="nav-item"> <Link className="nav-link" style={{color: 'white'}} to="/business">Business</Link></li>
                                <li className="nav-item"> <Link className="nav-link" style={{color: 'white'}} to="/entertainment">Entertainment</Link></li>
                                <li className="nav-item"> <Link className="nav-link" style={{color: 'white'}} to="/health">Health</Link></li>
                                <li className="nav-item"> <Link className="nav-link" style={{color: 'white'}} to="/science">Science</Link></li>
                                <li className="nav-item"> <Link className="nav-link" style={{color: 'white'}} to="/sports">Sports</Link></li>
                                <li className="nav-item"> <Link className="nav-link" style={{color: 'white'}} to="/technology">Technology</Link></li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
}

export default NavBar;
