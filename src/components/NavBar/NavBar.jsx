import React from "react";
import {NavItem} from "./NavItem/NavItem";

const NavBar = () => {

    return (
        <div >

            <div>

                <NavItem  to={'/content1'} elementName={'message'}/>
                <NavItem to={'/content2'} elementName={'stopper plug'}/>
                <NavItem to={'/content3'} elementName={'stopper plug'}/>
                <NavItem to={'/content4'} elementName={'stopper plug'}/>
                <NavItem to={'/content5'} elementName={'stopper plug'}/>
                <NavItem to={'/content6'} elementName={'stopper plug'}/>
            </div>
        </div>
    )
}

export default NavBar


