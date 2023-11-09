import { useState } from "react";



export function SubscribeBox(){

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [hide, setHide] = useState(window.innerWidth<750);

    const submitForm = (e) => {
        if(email.length<2 || name.length<2){
            e.preventDefault();
        }
    }

    const Toggle = ()=>{
        setHide(!hide);
    }


    if(!hide){
        return(
        <div className="subscribe-box">
        <button className="top-link" onClick={Toggle}>Ocultar</button>
       
       <b>Preventa <br/> Disponible <br/> Pronto</b>
       <p className="text-l" style={{marginBottom:20, marginTop:20}}>¿Te gusta el Juego? suscribete para recibir noticias nuestras.</p>
       
        <form onSubmit={submitForm} action="https://aventurasbonitas.us21.list-manage.com/subscribe/post?u=a480b97af16f9410c010f711f&amp;id=5b4d5992f1&amp;f_id=002be5e6f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self" novalidate="">
            <div class="mc-field-group"><label for="mce-FNAME">Nombre </label>
            <input type="text" name="FNAME" class=" text" id="mce-FNAME" value={name} onChange={(e)=>{setName(e.target.value)}} /></div>

            <label for="mce-EMAIL">Correo electrónico</label>
            <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required=""  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

            <div aria-hidden="true" style={{position:"absolute", left:-5000}}>
                <input type="text" name="b_a480b97af16f9410c010f711f_5b4d5992f1" tabindex="-1"/>
            </div>
            <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Suscribirme" style={{cursor:"pointer"}}/>

        </form>
    </div>)
    }
    else{
        return(
            <div className="subscribe-box" style={{cursor:"pointer"}} onClick={Toggle}>
                <b style={{textDecoration:"underline"}}>Suscribirme a la lista de correos</b>
            </div>
        )
    }
}
