import React from "react";
import {NavItem} from "./NavItem/NavItem";

const NavBar = () => {

    return (
        <div >

            <div>

                <NavItem  to={'/profile'} elementName={'profile'}/>
                <NavItem to={'/messenger'} elementName={'messenger'}/>
                <NavItem to={'/friends'} elementName={'friends'}/>
                <NavItem to={'/content4'} elementName={'stopper plug'}/>
                <NavItem to={'/content5'} elementName={'stopper plug'}/>
                <NavItem to={'/content6'} elementName={'stopper plug'}/>
            </div>
        </div>
    )
}

export default NavBar


