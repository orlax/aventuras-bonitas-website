import { Header } from "../components/Header"
import { Footer } from "../components/Footer";
import { SubscribeBox } from "../components/SubscribeBox";

const content = []

export function WorkScreen (){
    return(
    <div className="full-header" style={{width:"100%", overflowX:"hidden"}}>
        <Header/>
        <div className="container" style={{paddingTop:20}}>
        <h1>Trabaja con Nosotros</h1>
        <p>Aquí se encuentran las posiciones que estamos buscando llenar en el equipo de Aventuras Bonitas</p>

        <div style={{marginTop:30}}>

        <div style={{maxWidth: "36em"}}>

            <h2>Artista Generalista 2D y 3D</h2>
            
            <p>
                Estamos buscando un artista generalista en 2D y 3D, alguien que pueda hacerse cargo de
                todo el pipeline de arte de nuestros juegos. Desde el diseño de personajes y escenarios,     
                animación, rigging, texturizado y su integración en el motor de juegos de Unity.
            </p>
                
            <p>
                Somos un equipo pequeño apuntando a crear juegos increíbles, buscamos a un 
                candidato que pueda trabajar de forma independiente, que pueda aprender
                nuevas habilidades y tecnologías. Que nos proponga ideas nuevas y comparta esa pasión por hacer 
                un trabajo excepcional.
            </p>

            <b>Qué esperamos:</b>

            <ul>
                <li>Colaborar con el Diseñador del juego para entender e interpretar conceptos visuales.</li>
                <li>Crear assets 2D y 3D incluyendo personajes, ambientes y accesorios.</li>
                <li>Diseñar e ilustrar arte conceptual.</li>
                <li>Crear texturas y animaciones.</li>
                <li>Trabajar de cerca con los desarrolladores de gameplay para integrar los assets en el motor de juegos.</li>
                <li>Recibir feedback e iterar sobre los diseños realizados.</li>
            </ul>

            <b>Puntos extras</b>

            <ul>
                <li>Saber inglés en nivel B1/B2 o superior.</li>
                <li>Tener experiencia en la industria de videojuegos.</li>
                <li>Tener experiencia trabajando con sistemas de control de versiones.</li>
                <li>Tener experiencia trabajando con Unity.</li>
            </ul>

            <b>¿Por qué trabajar con nosotros?</b>

            <ul>
                <li>Estamos buscando miembros que se unan a nuestro equipo por los próximos años, este es un compromiso que brindará estabilidad laboral a largo plazo.</li>
                <li>Ofrecemos un ambiente de trabajo cordial, sin crunch, con metodologías de trabajo organizadas, sin cambios de dirección repentinos ni deadlines arbitrarios.</li>
                <li>Tenemos un programa de Mejora personal en el que averiguamos tus metas y hacemos lo que podemos por ayudarte a conseguirlas.</li>
                <li>Estamos trabajando en un juego genial, y puedes ser parte de ello.</li>
            </ul>

            <p>Estamos creando un juego increible, y necesitamos tu ayuda para continuar, si te interesa esta posicion llena el formulario</p>

            <div style={{marginTop:45}}>
                <a href="https://forms.gle/1aqA9A6KUuQiMWg17" target="new" className="button">Postularme a este Trabajo</a>
            </div>

        </div>

        {content.map((item)=>{
            return(
            <div className="flex column" style={{borderTop:"2px solid #ccc", marginBottom:20}}>
                <h2 style={{margin:"20px 0px 20px 10px"}}>{item.title}</h2>
                <div className="row">
                <iframe 
                width="560"
                height="315" 
                src={item.link}
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <div className="column" style={{flex:1, width:"100%", marginLeft:20}}>
                    <h3 style={{marginTop:10}}>{item.date}</h3>
                    <p>{item.description}</p>
                </div>
                </div>

            </div>)
        })}
        </div>

        </div>
        <SubscribeBox/>
        <Footer/>
    </div>)
}

