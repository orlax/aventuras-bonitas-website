

const logo = require('../img/ab_logo_gray.png');

export function Footer(){
    return(
    <footer>
        <div>
            <img src={logo} alt="" />
            <p>© Aventuras Bonitas 2023</p>
            <div></div>
        </div>
    </footer>)
}