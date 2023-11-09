import { Header } from "../components/Header"
import { Footer } from "../components/Footer";
import { SubscribeBox } from "../components/SubscribeBox";
import content from "../blog.json";

export function BlogScreen (){
    return(
    <div className="full-header" style={{width:"100%", overflowX:"hidden"}}>
        <Header/>
        <div className="container" style={{paddingTop:20}}>
        <h1>Blog de Desarrollo</h1>
        <p>Aquí se encuentran los blogs sobre el Desarrollo de nuestros Juegos.</p>

        <div style={{marginTop:30}}>

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

