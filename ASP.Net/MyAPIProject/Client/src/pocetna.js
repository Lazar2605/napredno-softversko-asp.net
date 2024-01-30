import { Logovanje } from "./logovanje.js";


fetch("https://localhost:7015/Korisnik/VratiKorisnika",
{
    method:"GET",
})
.then(p => {
    if(p.status == 200){
            window.location.href = "./glavna.html";
    }
    else if (p.status == 400) {
            var g = new Logovanje(document.body);
            g.Crtaj();
    }
})