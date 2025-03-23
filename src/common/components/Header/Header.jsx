import logo from "../../../assets/img/logo.png"
import {NavLink} from "react-router";
import s from './Header.module.css'

export const Header = () => {
    return (
        <div className={s.container}>

                <NavLink to={"/"} className={s.headerLink}><img src={logo} alt="logotype" className={s.logo}/></NavLink>
            <NavLink
                to="/"
                className={({ isActive }) => {
                    return isActive ? `${s.headerLinkActive}` : s.headerLink}}
            >
                Home
            </NavLink>
                <NavLink to={"/characters"} className={({ isActive }) => {
                    return isActive ? `${s.headerLinkActive}` : s.headerLink}}>Characters</NavLink>
                <NavLink to={"/locations"} className={({ isActive }) => {
                    return isActive ? `${s.headerLinkActive}` : s.headerLink}}>Locations</NavLink>
                <NavLink to={"/episodes"} className={({ isActive }) => {
                    return isActive ? `${s.headerLinkActive}` : s.headerLink}}>Episodes</NavLink>

        </div>
    )
}

