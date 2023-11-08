import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { SubscribeBox } from "../components/SubscribeBox"

const video = require("../videos/gameplay_video.mp4")
const hender_logo = require("../img/hender_logo.png")

const screen_shot_1 = require("../img/gameplay_1.png")
const screen_shot_2 = require("../img/gameplay_2.png")
const screen_shot_3 = require("../img/gameplay_3.png")
const banner = require("../img/banner.jpg")


export function HomeScreen (){
    return(
    <div>
        <Header/>
        <div className="video-container">
            <video src={video} autoPlay muted loop></video>
            <img className="hide-on-mobile" src={hender_logo} alt="Adventure in Henders castle Typography logo" />
        </div>

        <div className="container" style={{marginTop:33}}>
            <div className="row">
                <img src={screen_shot_1} className="half" alt="gameplay screenshot of adventure in henders castle" />
                <img src={screen_shot_3} className="half" alt="gameplay screenshot of adventure in henders castle" />
            </div>
            <div className="row">
                <div className="half">
                    <p className="text-xl">
                    Usa poderes mágicos para explorar un gran castillo lleno de misterios y 
                    trampas mientras buscas el Hechizo mas poderoso del mundo.
                    </p>
                    <table className="full">
                        <tr>
                            <td><b>Plataformas</b></td>
                            <td className="text-right">PC, Mac, Nintendo Switch</td>
                        </tr>    
                        <tr>
                            <td><b>Lanzamiento</b></td>
                            <td className="text-right">Q4 2024</td>
                        </tr>    
                    </table>    
                </div>
                <img className="half" src={screen_shot_2} alt="gameplay screenshot of adventure in henders castle" />
            </div>
        </div>

        <div className="container bg-gray" style={{marginTop:99}}>
            <div className="row">
                <div className="half">
                    <h2 style={{
                        padding: 20,
                        fontSize:"1.8em"
                    }}>Somos un estudio de Video Juegos haciendo juegos de aventuras</h2>
                </div>
                <div className="half center">
                    <p>
                        Aventuras Bonitas es un estudio de Video juegos Independiente de Barranquilla, 
                        Colombia. Fundado en 2022 para crear juegos de Aventuras. <br/>
                        <b>Actualmente trabajamos en nuestro primer juego Aventura en el Castillo de Hender</b>
                    </p>
                </div>
            </div>
            <img className="full" src={banner} alt="Illustration of a man walking on a green field with blue skies in the background" />
        </div>

        <Footer/>
        <SubscribeBox/>
    </div>)
}

