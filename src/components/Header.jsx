import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const logo = require('../img/ab_logo.png');
const menu_icon = require('../img/menu-icon.png');

export function Header(props){
    
    const [menu, setMenu] = useState(false);

    const Toggle = ()=>{
        setMenu(!menu);
    }

    return(
    <header className={props.className}>
        <div>
            <img src={logo} alt="" />
            <nav className='hide-on-mobile'>
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    Inicio
                </NavLink>
                <NavLink to="/blog" className={({ isActive }) => isActive ? "active" : ""}>
                    Blog
                </NavLink>
                <NavLink to="/jobs" className={({ isActive }) => isActive ? "active" : ""}>
                    Trabaja con nosotros
                </NavLink>
                <a href="https://www.youtube.com/channel/UCj6GYJhAIXQGVeSKn5UpoZQ" target='blank'>Youtube</a>
                <a href="https://www.tiktok.com/@aventurasbonitas0" target='blank'>TikTok</a>
                <a href="https://www.instagram.com/aventurasbonitas/" target='blank'>Instagram</a>
            </nav>

            {!menu && <img style={{width:35, height:35, cursor:"pointer"}} src={menu_icon} alt="" className='menu-icon only-mobile' onClick={Toggle} />}

            {menu && <nav className='only-mobile mobile-menu'>
                <NavLink to="/" onClick={Toggle} className={({ isActive }) => isActive ? "active" : ""}>
                    Inicio
                </NavLink>
                <NavLink to="/blog" onClick={Toggle} className={({ isActive }) => isActive ? "active" : ""}>
                    Blog
                </NavLink>
                <a href="https://www.youtube.com/channel/UCj6GYJhAIXQGVeSKn5UpoZQ" target='blank'>Youtube</a>
                <a href="https://www.tiktok.com/@aventurasbonitas0" target='blank'>TikTok</a>
                <a href="https://www.instagram.com/aventurasbonitas/" target='blank'>Instagram</a>
            </nav>}

        </div>
        

    </header>)
}