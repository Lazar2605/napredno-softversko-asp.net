import { Namirnica } from "./Namirnica.js";
export class Recept {
    constructor(id, naziv, priprema, kalorije) {
        this.id = id;
        this.naziv = naziv;
        this.priprema = priprema;
        this.kalorije = kalorije;
    }

    crtaj(host, ind) {
        let divLabela = document.createElement("div");
        host.appendChild(divLabela);
        let labela = document.createElement("label");
        labela.innerHTML = "Obrok" + (ind+1) + ":";
        divLabela.appendChild(labela);
        let divNamirnice = document.createElement("div");
        host.appendChild(divNamirnice);
        let labelaNamirnice = document.createElement("label");
        labelaNamirnice.innerHTML = "Namirnice: ";
        divNamirnice.appendChild(labelaNamirnice);

        fetch("https://localhost:7015/Recept/VratiSveNamirniceZaRecept/" + this.naziv)
        .then(pp => {
            if(pp.status == 200){
                pp.json().then(namirnice => {
                    namirnice.forEach((namirnica, ind) => {
                        var n = new Namirnica(namirnica.id, namirnica.tip, namirnica.naziv, namirnica.proteini, namirnica.masti, namirnica.ugh, namirnica.kalorije);
                        n.crtajNaziv(divNamirnice, ind);
                        
                    });

                })
            }
        })

        let divNaziv = document.createElement("div");
        host.appendChild(divNaziv);
        let labelaNaziv = document.createElement("label");
        labelaNaziv.innerHTML = "Naziv: " ;
        divNaziv.appendChild(labelaNaziv);
        let labelaNaz = document.createElement("label");
        labelaNaz.innerHTML = this.naziv;
        divNaziv.appendChild(labelaNaz);
        labelaNaz.onclick = () => {
            this.crtajFormu("recept");

        }
        labelaNaz.onmousemove = () => {
            labelaNaz.style.cursor = 'pointer';
            labelaNaz.style.color = "white";
        }
        labelaNaz.onmouseleave = () => {
            labelaNaz.style.color = "black";
        }
        
        let divLG = document.createElement("div");
        host.appendChild(divLG);
        let labelaGran = document.createElement("label");
        labelaGran.innerHTML = "------------------------";
        divLG.appendChild(labelaGran);

    }

    crtajFormu(flag) {

        let zaBrisanje = document.querySelector(".profil");
        if(zaBrisanje != null){
            zaBrisanje.parentNode.removeChild(zaBrisanje);
        }
        let divGlavni = document.createElement("div");
        if (flag == "recept")
            divGlavni.classList.add("recept");
        document.body.appendChild(divGlavni);
    
        let divForma = document.createElement("div");
        divForma.classList.add("formaProfil");
        divGlavni.appendChild(divForma);
    
        let zatvori = document.createElement("div");
        zatvori.classList.add("zatvori");
        zatvori.innerHTML = "+";
        divForma.appendChild(zatvori);
        zatvori.onclick = () => {
            divGlavni.parentNode.removeChild(divGlavni);
        }
    
        let naslov = document.createElement("h1");
        if (flag == "recept")
            naslov.innerHTML = "Recept: " + this.naziv;

        naslov.className = "naslovProfil"
        divForma.appendChild(naslov);
    
        let podaci = document.createElement("div");
        podaci.classList.add("podacii");
        divForma.appendChild(podaci);
    
        let host = document.createElement("div");
        host.className = "profill";
        podaci.appendChild(host);
    
        if (flag == "recept"){

            let divDiv = document.createElement("div");
            host.appendChild(divDiv);
            let labelaPrim = document.createElement("label");
            labelaPrim.innerHTML = "Priprema:";
            divDiv.appendChild(labelaPrim);
            let divPriprema = document.createElement("div");
            host.appendChild(divPriprema);
            let prp = this.priprema.split(" ");
            for(let i = 0; i < prp.length; i++) {
                if(i % 6 == 0) {
                    if(i + 6 < prp.length) {
                        let divPrp = document.createElement("div");
                        divPriprema.appendChild(divPrp);
                        let labelaPriprema = document.createElement("label");
                        labelaPriprema.innerHTML = prp[i] + " " + prp[i + 1] + " " + prp[i + 2] + " " + prp[i + 3] + " " + prp[i + 4] + " " + prp[i + 5];
                        divPrp.appendChild(labelaPriprema);
                    }
                    else {
                        let labelaPriprema = document.createElement("label");
                        labelaPriprema.innerHTML = "";
                        for (let j = i; j < prp.length; j++) {
    
                            let divPrp = document.createElement("div");
                            divPriprema.appendChild(divPrp);
                            labelaPriprema.innerHTML += prp[j] + " " ;
                            divPrp.appendChild(labelaPriprema);
                        }
                    }
                }
                
            }
            let divKalorije = document.createElement("div");
            host.appendChild(divKalorije);
            let labelaKalorije = document.createElement("label");
            labelaKalorije.innerHTML = "Kalorije: " + this.kalorije;
            divKalorije.appendChild(labelaKalorije);
        }
    }
}