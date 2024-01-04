import { useCallback } from 'react';


const logo = require('../img/ab_logo_gray.png');

export function Footer(){
    const getCurrentYear = useCallback(() => new Date().getFullYear(), []);

    return(
    <footer>
        <div>
            <img src={logo} alt="" />
            <p>© Aventuras Bonitas {getCurrentYear()}</p>
            <div></div>
        </div>
    </footer>)
}